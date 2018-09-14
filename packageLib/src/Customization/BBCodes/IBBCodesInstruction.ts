import { IFileInstruction } from "../../Automation/IFileInstruction";
import { IBBCodesInstructionOptions } from "./IBBCodesInstructionOptions";

/**
 * Represents an instruction that provides bb-codes.
 */
export interface IBBCodesInstruction extends IFileInstruction, Required<IBBCodesInstructionOptions>
{
}