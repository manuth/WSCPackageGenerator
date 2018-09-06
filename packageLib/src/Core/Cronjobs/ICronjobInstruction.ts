import { ICronjobInstructionOptions } from "./ICronjobInstructionOptions";
import { IFileInstruction } from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides cron-jobs.
 */
export interface ICronjobInstruction extends IFileInstruction, Required<ICronjobInstructionOptions>
{
}