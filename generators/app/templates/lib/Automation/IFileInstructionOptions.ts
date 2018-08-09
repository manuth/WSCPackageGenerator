import IInstructionOptions from "./IInstructionOptions";

/**
 * Provides options for the `IFileInstruction` interface.
 */
export default interface IFileInstructionOptions extends IInstructionOptions
{
    /**
     * Gets or sets the filename of the ouput of the instruction.
     */
    FileName?: string;
}