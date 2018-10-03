import { isNullOrUndefined } from "util";
import { DOMParser, XMLSerializer } from "xmldom";

/**
 * Provides utilities for the xml-serialization.
 */
export class XML
{
    /**
     * Creates a new xml-document.
     *
     * @param tagName
     * The name of the tag of the `documentElement`.
     */
    public static CreateDocument(tagName: string): Document
    {
        let result: Document = new DOMParser().parseFromString(`<${tagName} />`);
        result.insertBefore(
            result.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"'),
            result.documentElement);

        return result;
    }

    /**
     * Formats an element.
     *
     * @param element
     * The element to format.
     *
     * @param indent
     * The indentation of the element itself.
     */
    protected static FormatElement(element: Element, indent: string = ""): void
    {
        let innerIndent: string = `${" ".repeat(4)}${indent}`;

        if (element.childNodes.length > 0)
        {
            let children: Node[] = [];

            for (let i: number = 0; i < element.childNodes.length; i++)
            {
                children.push(element.childNodes.item(i));
            }

            for (let child of children)
            {
                switch (child.nodeType)
                {
                    case element.ELEMENT_NODE:
                    case element.PROCESSING_INSTRUCTION_NODE:
                    case element.COMMENT_NODE:
                    case element.DOCUMENT_NODE:
                    case element.DOCUMENT_TYPE_NODE:
                        element.insertBefore(element.ownerDocument.createTextNode(`\n${innerIndent}`), child);

                        if (child.nodeType === element.ELEMENT_NODE)
                        {
                            this.FormatElement(child as Element, `${innerIndent}`);
                        }
                        break;

                    case element.TEXT_NODE:
                        if (
                            (children.length > 1) && child.textContent.trim().length === 0)
                        {
                            element.removeChild(child);
                        }
                }
            }

            if (
                children.length > 0 &&
                element.lastChild.nodeType !== element.CDATA_SECTION_NODE &&
                element.lastChild.nodeType !== element.TEXT_NODE)
            {
                element.appendChild(element.ownerDocument.createTextNode(`\n${indent}`));
            }
        }
    }

    /**
     * Formats xml-code.
     *
     * @param xml
     * The xml-code to format.
     *
     * @returns
     * Formatted xml-code.
     */
    public static Format(xml: string): string
    {
        let document: Document = new DOMParser().parseFromString(xml);
        let children: Node[] = [];

        for (let i: number = 0; i < document.childNodes.length; i++)
        {
            children.push(document.childNodes.item(i));
        }

        if (children.length > 0)
        {
            for (let child of children)
            {
                if (child !== document.firstChild)
                {
                    document.insertBefore(document.createTextNode("\n"), child);
                }
            }
        }

        this.FormatElement(document.documentElement);
        return new XMLSerializer().serializeToString(document);
    }

    /**
     * Creates a new element and appends it to the `parent`.
     *
     * @param parent
     * The element to append the new element to.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param processor
     * A method for manipulating the new element.
     */
    public static AddElement(parent: Element, tag: string, processor?: (element: Element) => void): void
    {
        let element: Element = parent.ownerDocument.createElement(tag);
        parent.appendChild(element);

        if (!isNullOrUndefined(processor))
        {
            processor(element);
        }
    }

    /**
     * Creates a new element with the specified `textContent` and appends it to the `parent`.
     *
     * @param parent
     * The element to append the new element to.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     */
    public static AddCDATAElement(parent: Element, tag: string, textContent: string, processor?: (element: Element) => void): void
    {
        this.AddElement(
            parent,
            tag,
            (element: Element) =>
            {
                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }

                element.appendChild(parent.ownerDocument.createCDATASection(textContent));
            });
    }

    /**
     * Creates a new element with the specified `textContent` and appends it to the `parent`.
     *
     * @param parent
     * The element to append the new element to.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     */
    public static AddTextElement(parent: Element, tag: string, textContent: string, processor?: (element: Element) => void): void
    {
        this.AddElement(
            parent,
            tag,
            (element: Element) =>
            {
                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }

                element.appendChild(parent.ownerDocument.createTextNode(textContent));
            });
    }
}