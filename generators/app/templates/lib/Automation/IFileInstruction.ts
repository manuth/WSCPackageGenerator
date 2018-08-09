import IFileInstructionOptions from "./IFileInstructionOptions";
import IInstruction from "./IInstruction";

/**
 * Represents an instruction that is bound to a file.
 */
export default interface IFileInstruction extends IInstruction, Required<IFileInstructionOptions>
{
}