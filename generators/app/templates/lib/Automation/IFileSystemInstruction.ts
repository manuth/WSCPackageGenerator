import IFileSystemInstructionOptions from "./IFileSystemInstructionOptions";
import IFileInstruction from "./IFileInstruction";

/**
 * Represents an instruction that is bound to the file-system.
 */
export default interface IFileSystemInstruction extends IFileInstruction, Required<IFileSystemInstructionOptions>
{
}