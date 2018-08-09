import IFileInstructionOptions from "../../Automation/IFileInstructionOptions";
import Cronjob from "./Cronjob";

/**
 * Provides options for the `ICronjobInstruction` interface.
 */
export default interface ICronjobInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets or sets the cron-jobs provided by the instruction.
     */
    Cronjobs: Cronjob[];
}