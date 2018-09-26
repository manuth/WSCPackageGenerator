import * as FileSystem from "fs-extra";
import { XMLSerializer } from "xmldom";
import { XML } from "../../Serialization/XML";
import { Compiler } from "../Compiler";

/**
 * Provides the functionality to compile theme-variables.
 */
export class ThemeVariableCompiler extends Compiler<{ [key: string]: string }>
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

    protected async Compile(): Promise<void>
    {
        let document: Document = XML.CreateDocument("variables");
        document.documentElement.setAttribute("xmlns", "http://www.woltlab.com");
        document.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        document.documentElement.setAttribute("xsi:schemaLocation", "http://www.woltlab.com http://www.woltlab.com/XSD/tornado/styleVariables.xsd");

        for (let name in this.Item)
        {
            let variable: Element = document.createElement("variable");
            variable.setAttribute("name", name);
            variable.appendChild(document.createTextNode(this.Item[name]));
            document.documentElement.appendChild(variable);
        }

        await FileSystem.writeFile(this.DestinationPath, XML.Prettify(new XMLSerializer().serializeToString(document)));
    }
}