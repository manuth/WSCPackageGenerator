import { IInstructionOptions } from "../IInstructionOptions";

/**
 * Provides options for the `FileSystemInstruction` class.
 */
export interface IFileSystemInstructionOptions extends IInstructionOptions
{
    /**
     * The path to the file-system entry the instruction is bound to.
     */
    Source: string;
}