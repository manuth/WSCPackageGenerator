import { IFileInstruction } from "../../Automation/IFileInstruction";
import { ICronjobInstructionOptions } from "./ICronjobInstructionOptions";

/**
 * Represents an instruction that provides cronjobs.
 */
export interface ICronjobInstruction extends IFileInstruction, Required<ICronjobInstructionOptions>
{
}