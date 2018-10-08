import { FileSystemInstruction } from "../../../PackageSystem/Instructions/FileSystem/FileSystemInstruction";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile an sql-instruction.
 */
export class FileSystemInstructionCompiler extends InstructionCompiler<FileSystemInstruction>
{
    /**
     * Initializes a new instance of the `FileSystemInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: FileSystemInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        await this.CopyTemplate(this.Item.Source, this.DestinationFileName);
    }
}