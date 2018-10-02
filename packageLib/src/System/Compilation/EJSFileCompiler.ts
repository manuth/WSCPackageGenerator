import { XMLFileCompiler } from "./XMLFileCompiler";

/**
 * Provides the functionality to compile `xml`-files which contain `EJS`-strings.
 */
export abstract class EJSFileCompiler<T> extends XMLFileCompiler<T>
{
    /**
     * Initializes a new instance of the `EJSXMLCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the delimiter of the EJS-strings inside the document.
     */
    protected get Delimiter(): string
    {
        return "%";
    }

    /**
     * Gets the pattern to match against the document.
     */
    protected get Pattern(): RegExp
    {
        return new RegExp(`<${this.Delimiter}.*?${this.Delimiter}>`, "g");
    }

    protected get Document(): Document
    {
        let document: Document = super.Document;
        this.FixEJSTags(document);
        return document;
    }

    /**
     * Fixes the ejs-tags inside the node.
     *
     * @param node
     * The node to fix.
     */
    protected FixEJSTags(node: Node): void
    {
        switch (node.nodeType)
        {
            case node.TEXT_NODE:
                if (this.Pattern.test(node.textContent))
                {
                    node.parentNode.replaceChild(node.ownerDocument.createCDATASection(node.textContent), node);
                }
                break;
            default:
                if (node.hasChildNodes())
                {
                    for (let i: number = 0; i < node.childNodes.length; i++)
                    {
                        let child: Node = node.childNodes.item(i);
                        this.FixEJSTags(child);
                    }
                }
                break;
        }
    }
}