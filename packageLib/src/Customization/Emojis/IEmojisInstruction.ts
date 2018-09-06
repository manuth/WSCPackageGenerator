import { IEmojisInstructionOptions } from "./IEmojisInstructionOptions";
import { IFileInstruction } from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides emojis.
 */
export interface IEmojisInstruction extends IFileInstruction, Required<IEmojisInstructionOptions>
{
}