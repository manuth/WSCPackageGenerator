import IEmojisInstructionOptions from "./IEmojisInstructionOptions";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides emojis.
 */
export default interface IEmojisInstruction extends IFileInstruction, Required<IEmojisInstructionOptions>
{
}