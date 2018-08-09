import IBBCodesInstructionOptions from "./IBBCodesInstructionOptions";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides bb-codes.
 */
export default interface IBBCodesInstruction extends IFileInstruction, Required<IBBCodesInstructionOptions>
{
}