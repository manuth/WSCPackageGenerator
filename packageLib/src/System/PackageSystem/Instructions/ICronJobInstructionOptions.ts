import { ICronJobOptions } from "../../System/Tasks/ICronJobOptions";
import { IInstructionOptions } from "./IInstructionOptions";
import { IRemovableInstruction } from "./IRemovableInstruction";

/**
 * Provides options for the `CronJobInstruction` class.
 */
export interface ICronJobInstructionOptions extends IInstructionOptions, Partial<IRemovableInstruction>
{
    /**
     * The cron-jobs provided by the instruction.
     */
    CronJobs: ICronJobOptions[];
}