import * as FileSystem from "fs-extra";
import { XMLSerializer } from "xmldom";
import { TempFile } from "../FileSystem/TempFile";
import { Instruction } from "../PackageSystem/Instructions/Instruction";
import { XML } from "../Serialization/XML";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile instructions to `.xml`-files.
 */
export abstract class XMLInstructionCompiler<T extends Instruction> extends InstructionCompiler<T>
{
    /**
     * Gets the tag-name of the root element of the xml-document.
     */
    protected get TagName(): string
    {
        return "data";
    }

    /**
     * Gets the location of the schema for the instruction.
     */
    protected abstract get SchemaLocation(): string;

    protected async Compile(): Promise<void>
    {
        let tempFile: TempFile = new TempFile();
        {
            await FileSystem.writeFile(
                tempFile.FileName,
                XML.Prettify(new XMLSerializer().serializeToString(this.XMLElement)));

            await this.CopyTemplate(tempFile.FileName, this.DestinationFileName);
        }
        tempFile.Dispose();
    }

    /**
     * Gets the xml-element of the instruction.
     */
    protected get XMLElement(): Document
    {
        let result: Document = XML.CreateDocument(this.TagName);
        result.documentElement.setAttribute("xmlns", "http://www.woltlab.com");
        result.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instace");
        result.documentElement.setAttribute("xsi:schemaLocation", `http://www.woltlab.com ${this.SchemaLocation}`);
        return result;
    }
}