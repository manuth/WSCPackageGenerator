import { isNullOrUndefined } from "util";

/**
 * Provides the functionality to edit xml-files.
 */
export class XMLEditor
{
    /**
     * The element to edit.
     */
    private element: Element;

    /**
     * Initializes a new instance of the `XMLEditor<T>` class.
     *
     * @param element
     * The element to edit.
     */
    public constructor(element: Element)
    {
        this.element = element;
    }

    /**
     * Gets the element to edit.
     */
    public get Element(): Element
    {
        return this.element;
    }

    /**
     * Gets the child-nodes of the element.
     */
    public get ChildNodes(): ReadonlyArray<Node>
    {
        return XMLEditor.ToArray(this.Element.childNodes);
    }

    /**
     * Converts a node-list to an array.
     *
     * @param nodeList
     * The node-list to convert.
     */
    private static ToArray<T extends Node>(nodeList: NodeList | NodeListOf<T>): T[]
    {
        let result: T[];

        for (let node of nodeList)
        {
            result.push(node as T);
        }

        return result;
    }

    /**
     * Adds a new node.
     *
     * @param node
     * The node to add.
     */
    public Add<T extends Node>(node: T, processor?: (node: T) => void): void
    {
        this.Element.appendChild(node);

        if (!isNullOrUndefined(processor))
        {
            processor(node);
        }
    }

    /**
     * Adds a new element.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param processor
     * A method for manipulating the new element.
     */
    public AddElement(tag: string, processor?: (element: XMLEditor) => void): void
    {
        let element: Element = this.Element.ownerDocument.createElement(tag);
        this.Element.appendChild(element);

        if (!isNullOrUndefined(processor))
        {
            processor(new XMLEditor(element));
        }
    }

    /**
     * Adds a new element with the specified `textContent` wrapped by a CDATA-section.
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
    public AddCDATAElement(tag: string, textContent: string, processor?: (element: XMLEditor) => void): void
    {
        this.AddElement(
            tag,
            (element: XMLEditor) =>
            {
                this.Add(this.Element.ownerDocument.createCDATASection(textContent));

                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }
            });
    }

    /**
     * Adds a new element with the specified `textContent`.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     */
    public AddTextElement(tag: string, textContent: string, processor?: (element: XMLEditor) => void): void
    {
        this.AddElement(
            tag,
            (element: XMLEditor) =>
            {
                this.Add(this.Element.ownerDocument.createTextNode(textContent));

                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }
            });
    }

    /**
     * Gets all children of the element with a specified tag.
     *
     * @param tag
     * The tag to look for.
     */
    public GetChildElementsByTag(tag: string): Node[]
    {
        return this.GetElementsByTag(tag).filter((node: Node) => node.parentNode === this.Element);
    }

    /**
     * Gets all elements with a specified tag.
     *
     * @param tag
     * The tag to look for.
     */
    public GetElementsByTag(tag: string): Node[]
    {
        return XMLEditor.ToArray(this.Element.getElementsByTagName(tag));
    }
}