import { XMLFileCompiler } from "./XMLFileCompiler";

/**
 * Provides the functionality to compile `xml`-files which contain `EJS`-strings.
 */
export abstract class EJSFileCompiler<T> extends XMLFileCompiler<T>
{
    /**
     * Initializes a new instance of the `EJSFileCompiler<T>` class.
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
    protected get Delimiter()
    {
        return "%";
    }

    /**
     * Gets the pattern to match against the document.
     */
    protected get Pattern()
    {
        return new RegExp(`<${this.Delimiter}.*?${this.Delimiter}>`, "g");
    }

    protected get Document()
    {
        let document = super.Document;
        this.FixEJSTags(document);
        return document;
    }

    /**
     * Fixes the ejs-tags inside the node.
     *
     * @param node
     * The node to fix.
     */
    protected FixEJSTags(node: Node)
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
                    for (let i = 0; i < node.childNodes.length; i++)
                    {
                        let child = node.childNodes.item(i);
                        this.FixEJSTags(child);
                    }
                }
                break;
        }
    }
}