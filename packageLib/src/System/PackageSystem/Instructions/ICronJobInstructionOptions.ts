import { ICronJobOptions } from "../../Tasks/ICronJobOptions";
import { IInstructionOptions } from "./IInstructionOptions";

/**
 * Provides options for the `CronJobInstruction` class.
 */
export interface ICronJobInstructionOptions extends IInstructionOptions
{
    /**
     * The cron-jobs provided by the instruction.
     */
    CronJobs: ICronJobOptions[];
}