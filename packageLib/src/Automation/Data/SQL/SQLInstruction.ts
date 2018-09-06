import { FileSystemInstruction } from "../../FileSystemInstruction";
import { IFileSystemInstructionOptions } from "../../IFileSystemInstructionOptions";

/**
 * Represents an instruction which provides an sql-file execute when invoking the instruction.
 */
export class SQLInstruction extends FileSystemInstruction
{
    /**
     * Initializes a new instance of the `SQLInstruction` class.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super(options);
    }
}