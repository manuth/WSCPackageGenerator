import { XMLEditor } from "../../Serialization/XMLEditor";
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
        return "http://www.woltlab.com/XSD/tornado/styleVariables.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        for (let name in this.Item)
        {
            editor.AddTextElement("variable", this.Item[name], (variable: XMLEditor) => variable.SetAttribute("name", name));
        }

        return document;
    }
}