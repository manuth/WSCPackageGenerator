import FileSystemInstruction from "../../FileSystemInstruction";
import IFileSystemInstruction from "../../IFileSystemInstruction";

/**
 * Represents an instruction which provides an sql-file execute when invoking the instruction.
 */
export default class SQLInstruction extends FileSystemInstruction
{
    /**
     * Initializes a new instance of the `SQLInstruction` class.
     */
    public constructor(options: IFileSystemInstruction)
    {
        super(options);
    }
}