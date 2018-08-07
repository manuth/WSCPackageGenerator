import IFileInstruction from "../../Automation/IFileInstruction";
import Cronjob from "./Cronjob";

/**
 * Represents an instruction that provides cron-jobs.
 */
export default interface ICronjobInstruction extends IFileInstruction
{
    /**
     * Gets or sets the cron-jobs provided by the instruction.
     */
    Cronjobs: Cronjob[];
}