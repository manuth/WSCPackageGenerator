import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { InstructionFileCompiler } from "./InstructionFileCompiler";

/**
 * Provides the functionality to compile files which make use of EJS-templates.
 */
export abstract class TemplateInstructionCompiler<T extends IInstruction> extends InstructionFileCompiler<T>
{
    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let tempFile: TempFile = new TempFile();
        {
            await FileSystem.writeFile(tempFile.FullName, await FileSystem.readFile(this.DestinationFileName));
            await this.CopyTemplate(tempFile.FullName, this.DestinationFileName);
        }
        tempFile.Dispose();
    }
}