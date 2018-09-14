import { IFileInstruction } from "../../Automation/IFileInstruction";
import { IEmojisInstructionOptions } from "./IEmojisInstructionOptions";

/**
 * Represents an instruction that provides emojis.
 */
export interface IEmojisInstruction extends IFileInstruction, Required<IEmojisInstructionOptions>
{
}