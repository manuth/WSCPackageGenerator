import IFileInstruction from "./IFileInstruction";

/**
 * Represents an instruction that is bound to the file-system.
 */
export default interface IFileSystemInstruction extends IFileInstruction
{
    /**
     * Gets or sets the root-path of the filesystem-entry that belongs to the instruction.
     */
    SourceRoot: string;
}