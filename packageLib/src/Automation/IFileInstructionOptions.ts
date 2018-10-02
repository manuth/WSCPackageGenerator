import { IInstructionOptions } from "./IInstructionOptions";

/**
 * Provides options for the `IFileInstruction` interface.
 */
export interface IFileInstructionOptions extends IInstructionOptions
{
    /**
     * Gets or sets the filename of the output of the instruction.
     */
    FileName?: string;
}