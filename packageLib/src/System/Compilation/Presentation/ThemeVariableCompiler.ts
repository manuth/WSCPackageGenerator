import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile theme-variables.
 */
export class ThemeVariableCompiler extends WoltLabXMLCompiler<{ [key: string]: string }>
{
    /**
     * Initializes a new instance of the `ThemeVariableCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: { [key: string]: string })
    {
        super(item);
    }

    protected get TagName(): string
    {
        return "variables";
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com http://www.woltlab.com/XSD/tornado/styleVariables.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();

        for (let name in this.Item)
        {
            let variable: Element = document.createElement("variable");
            variable.setAttribute("name", name);
            variable.appendChild(document.createTextNode(this.Item[name]));
            document.documentElement.appendChild(variable);
        }

        return document;
    }
}