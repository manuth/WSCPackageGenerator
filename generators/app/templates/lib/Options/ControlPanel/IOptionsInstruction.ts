import { IFileInstruction } from "../../Automation/IFileInstruction";
import { IOptionsInstructionOptions } from "./IOptionsInstructionOptions";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export interface IOptionsInstruction extends IFileInstruction, Required<IOptionsInstructionOptions>
{
}