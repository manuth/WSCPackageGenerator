import IFileInstructionOptions from "./IFileInstructionOptions";

/**
 * Provides options for the `IFileSystemInstruction` interface.
 */
export default interface IFileSystemInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets or sets the root-path of the filesystem-entry that belongs to the instruction.
     */
    SourceRoot: string;
}