import IOptionsInstructionOptions from "./IOptionsInstructionOptions";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default interface IOptionsInstruction extends IFileInstruction, Required<IOptionsInstructionOptions>
{
}