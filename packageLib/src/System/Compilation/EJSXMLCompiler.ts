import { XMLFileCompiler } from "./XMLFileCompiler";

/**
 * Provides the functionality to compile `xml`-files which contain `EJS`-strings.
 */
export abstract class EJSXMLCompiler<T> extends XMLFileCompiler<T>
{
    /**
     * Gets the delimiter of the EJS-strings inside the document.
     */
    protected get Delimiter(): string
    {
        return "%";
    }

    protected get Content(): string
    {
        let content: string = super.Content;
        content = content.replace(new RegExp(`(&lt;|<)(${this.Delimiter}.*${this.Delimiter})(&gt;|>)`, "g"), "<$2>");
        return content;
    }
}