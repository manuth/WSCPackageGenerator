import { TempDirectory } from "../FileSystem/TempDirectory";
import { ApplicationFileSystemInstruction } from "../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile a file-instruction.
 */
export class FileInstructionCompiler extends InstructionCompiler<ApplicationFileSystemInstruction>
{
    protected async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();
        await this.CopyTemplate(this.Item.Source, tempDir.FileName);
        await this.Compress(tempDir.FileName, this.DestinationFileName);
        tempDir.Dispose();
    }
}