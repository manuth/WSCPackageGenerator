import { Cronjob } from "./Cronjob";
import { IFileInstructionOptions } from "../../Automation/IFileInstructionOptions";

/**
 * Provides options for the `ICronjobInstruction` interface.
 */
export interface ICronjobInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets or sets the cron-jobs provided by the instruction.
     */
    Cronjobs: Cronjob[];
}