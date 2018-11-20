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
     * Initializes a new instance of the `XMLEditor` class.
     *
     * @param element
     * The element to edit.
     */
    public constructor(element: Element)
    {
        this.element = element;
    }

    /**
     * Gets the name of the tag of the element.
     */
    public get TagName()
    {
        return this.Element.tagName;
    }

    /**
     * Gets the element to edit.
     */
    public get Element()
    {
        return this.element;
    }

    /**
     * Gets or sets the text of the element.
     */
    public get TextContent()
    {
        return this.Element.textContent;
    }

    public set TextContent(value)
    {
        this.Element.textContent = value;
    }

    /**
     * Gets the parent of the element.
     */
    public get ParentNode()
    {
        return this.Element.parentNode;
    }

    /**
     * Gets the document of the element.
     */
    public get Document()
    {
        return this.Element.ownerDocument;
    }

    /**
     * Gets the child-nodes of the element.
     */
    public get ChildNodes(): Node[]
    {
        return XMLEditor.ToArray(this.Element.childNodes);
    }

    /**
     * Creates a new element.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param processor
     * A method for manipulating the new element.
     */
    public CreateElement(tag: string, processor?: (element: XMLEditor) => void)
    {
        let editor = new XMLEditor(this.Document.createElement(tag));

        if (!isNullOrUndefined(processor))
        {
            processor(editor);
        }

        return editor;
    }

    /**
     * Creates a new element with the specified `textContent` wrapped by a CDATA-section.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     *
     * @param processor
     * A method for manipulating the new element.
     */
    public CreateCDATAElement(tag: string, textContent: string, processor?: (element: XMLEditor) => void)
    {
        return this.CreateElement(
            tag,
            (element) =>
            {
                element.Add(this.Document.createCDATASection(textContent));

                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }
            });
    }

    /**
     * Creates a new element with the specified `textContent`.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     */
    public CreateTextElement(tag: string, textContent: string, processor?: (element: XMLEditor) => void): XMLEditor
    {
        return this.CreateElement(
            tag,
            (element) =>
            {
                element.TextContent = textContent;

                if (!isNullOrUndefined(processor))
                {
                    processor(element);
                }
            });
    }

    /**
     * Adds a new node.
     *
     * @param node
     * The node to add.
     */
    public Add<T extends Node | XMLEditor>(node: T, processor?: (node: T) => void): void
    {
        let element: Node;

        if (node instanceof XMLEditor)
        {
            element = node.Element;
        }
        else
        {
            element = node as Node;
        }

        this.Element.appendChild(element);

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
        this.Add(this.CreateElement(tag, processor));
    }

    /**
     * Adds a new element with the specified `textContent` wrapped by a CDATA-section.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     *
     * @param processor
     * A method for manipulating the new element.
     */
    public AddCDATAElement(tag: string, textContent: string, processor?: (element: XMLEditor) => void): void
    {
        this.Add(this.CreateCDATAElement(tag, textContent, processor));
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
        this.Add(this.CreateTextElement(tag, textContent, processor));
    }

    /**
     * Inserts an element at a specific position.
     *
     * @param index
     * The index to insert the element.
     *
     * @param element
     * The element to insert.
     */
    public Insert(index: number, element: XMLEditor | Node): void
    {
        let node: Node;

        if (element instanceof XMLEditor)
        {
            node = element.Element;
        }
        else
        {
            node = element;
        }

        if (index === this.ChildNodes.length)
        {
            this.Add(node);
        }
        else if (index < this.ChildNodes.length)
        {
            this.Element.insertBefore(node, this.ChildNodes[index]);
        }
        else
        {
            throw new RangeError();
        }
    }

    /**
     * Gets all children of the element with a specified tag.
     *
     * @param tag
     * The tag to look for.
     */
    public GetChildrenByTag(tag: string)
    {
        return this.GetElementsByTag(tag).filter((node: XMLEditor) => node.ParentNode === this.Element);
    }

    /**
     * Gets all elements with a specified tag.
     *
     * @param tag
     * The tag to look for.
     */
    public GetElementsByTag(tag: string)
    {
        return XMLEditor.ToArray(this.Element.getElementsByTagName(tag)).map((element: Element) => new XMLEditor(element));
    }

    /**
     * Gets the text of a child-node.
     *
     * @param tag
     * The tag of the node to get the text.
     */
    public GetText(tag: string): string
    {
        if (this.HasTag(tag, true))
        {
            return this.GetChildrenByTag(tag)[0].TextContent;
        }
        else
        {
            throw new RangeError(`The tag "${tag}" either is not unique or does not exist.`);
        }
    }

    /**
     * Gets the value of an attribute.
     *
     * @param name
     * The name of the attribute to get.
     */
    public GetAttribute(name: string): string
    {
        if (this.HasAttribute(name))
        {
            return this.Element.getAttribute(name);
        }
        else
        {
            throw new RangeError(`The attribute "${name}" does not exist.`);
        }
    }

    /**
     * Sets the value of an attribute.
     *
     * @param name
     * The name of the attribute to set.
     *
     * @param value
     * The value to set.
     */
    public SetAttribute(name: string, value: string): void
    {
        this.Element.setAttribute(name, value);
    }

    /**
     * Gets a value indicating whether an attribute with the specified name exists.
     *
     * @param name
     * The name to look for.
     */
    public HasAttribute(name: string, value?: string): boolean
    {
        return this.Element.hasAttribute(name) && (isNullOrUndefined(value) || (this.Element.getAttribute(name) === value));
    }

    /**
     * Asserts a tag to contain a text.
     *
     * @param text
     * The text to assert.
     *
     * @param tag
     * The tag to check.
     */
    public HasText(tag: string, text: string): boolean
    {
        let original: string;

        if (!isNullOrUndefined(tag))
        {
            try
            {
                original = this.GetText(tag);
            }
            catch
            {
                original = null;
            }
        }
        else
        {
            original = this.TextContent;
        }

        return original === text;
    }

    /**
     * Asserts the element to have a tag.
     * @param tag
     * The tag to assert.
     *
     * @param unique
     * A value indicating whether the tag is unique.
     */
    public HasTag(tag: string, unique?: boolean): boolean
    {
        let children: XMLEditor[] = this.GetChildrenByTag(tag);
        unique = unique || false;

        if (unique)
        {
            return children.length === 1;
        }
        else
        {
            return children.length > 0;
        }
    }

    /**
     * Converts a node-list to an array.
     *
     * @param nodeList
     * The node-list to convert.
     */
    protected static ToArray<T extends Node>(nodeList: { length: number, item(index: number): T })
    {
        let result: T[] = [];

        for (let i = 0; i < nodeList.length; i++)
        {
            result.push(nodeList.item(i));
        }

        return result;
    }
}