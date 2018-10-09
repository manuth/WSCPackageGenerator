import { INamedObject } from "../../../INamedObject";
import { ICronJobOptions } from "../../../Tasks/ICronJobOptions";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";

/**
 * Provides options for the `CronJobInstruction` class.
 */
export interface ICronJobInstructionOptions extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The cron-jobs provided by the instruction.
     */
    CronJobs: ICronJobOptions[];
}