import { IFileInstruction } from "./IFileInstruction";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";

/**
 * Represents an instruction that is bound to the file-system.
 */
export interface IFileSystemInstruction extends IFileInstruction, Required<IFileSystemInstructionOptions>
{
}