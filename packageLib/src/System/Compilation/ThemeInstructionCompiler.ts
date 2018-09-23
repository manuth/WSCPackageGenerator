import * as FileSystem from "fs-extra";
import { isNullOrUndefined } from "util";
import { TempDirectory } from "../FileSystem/TempDirectory";
import { TempFile } from "../FileSystem/TempFile";
import { ThemeInstruction } from "../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { XML } from "../Serialization/XML";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile styles
 */
export class ThemeInstructionCompiler extends InstructionCompiler<ThemeInstruction>
{
    /**
     * Initializes a new instance of the `ThemeVariableCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ThemeInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        let styleDirectory: TempDirectory = new TempDirectory();
        {
            let variableFile: TempFile = new TempFile();
            {
                let variables: { [key: string]: string } = {};
                let variableDocument: Document = XML.CreateDocument("variables");
                Object.assign(variables, this.Item.Theme.Variables);

                if (!isNullOrUndefined(this.Item.Theme.CustomScss))
                {
                    variables.indivicualScss = this.Item.Theme.CustomScss;
                }

                if (!isNullOrUndefined(this.Item.Theme.ScssOverride))
                {
                    variables.overrideScss = this.Item.Theme.ScssOverride;
                }

                variableDocument.documentElement.setAttribute("xmlns", "http://www.woltlab.com");
                variableDocument.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
                variableDocument.documentElement.setAttribute("xsi:schemaLocation", "http://www.woltlab.com http://www.woltlab.com/XSD/tornado/styleVariables.xsd");

                for (let variableName in this.Item.Theme.Variables)
                {
                    let variableNode: Element = variableDocument.createElement("variable");
                    variableNode.setAttribute("name", variableName);
                    variableNode.appendChild(variableDocument.createTextNode(this.Item[variableName]));
                    variableDocument.documentElement.appendChild(variableNode);
                }

                await FileSystem.writeFile(variableFile.FileName, XML.Prettify(new XMLSerializer().serializeToString(variableDocument)));
                await this.CopyTemplate(variableFile.FileName, styleDirectory.MakePath("variables.xml"));
            }
        }
    }
}