import { EJSXMLCompiler } from "./EJSXMLCompiler";

/**
 * Provides the functionality to compile components to `xml`-files optimized for woltlab.
 */
export abstract class WoltLabXMLCompiler<T> extends EJSXMLCompiler<T>
{
    protected get TagName(): string
    {
        return "data";
    }

    /**
     * Gets the location of the schema for the instruction.
     */
    protected abstract get SchemaLocation(): string;

    protected get XMLElement(): Document
    {
        let document: Document = super.XMLElement;
        document.documentElement.setAttribute("xmlns", "http://www.woltlab.com");
        document.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instace");
        document.documentElement.setAttribute("xsi:schemaLocation", `http://www.woltlab.com ${this.SchemaLocation}`);
        return document;
    }
}