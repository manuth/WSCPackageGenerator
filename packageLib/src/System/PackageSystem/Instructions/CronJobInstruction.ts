import { isNullOrUndefined } from "util";
import { CronJob } from "../../Tasks/CronJob";
import { ICronJobInstructionOptions } from "./ICronJobInstructionOptions";
import { Instruction } from "./Instruction";
import { IRemovableInstruction } from "./IRemovableInstruction";

/**
 * Represents an instruction which install cron-jobs.
 */
export class CronJobInstruction extends Instruction implements IRemovableInstruction
{
    /**
     * The cron-jobs provided by the instruction.
     */
    private cronJobs: CronJob[] = [];

    /**
     * The items to remove.
     */
    private itemsToRemove: string[] = [];

    /**
     * Initializes a new instance of the `CronJobInstruction` class.
     */
    public constructor(options: ICronJobInstructionOptions)
    {
        super(options);

        for (let cronJob of options.CronJobs)
        {
            this.CronJobs.push(new CronJob(cronJob));
        }

        if (!isNullOrUndefined(options.ItemsToRemove))
        {
            this.ItemsToRemove = options.ItemsToRemove;
        }
    }

    public get Type(): string
    {
        return "cronjob";
    }

    /**
     * Gets or sets the cron-jobs provided by the instruction.
     */
    public get CronJobs(): CronJob[]
    {
        return this.cronJobs;
    }

    public set CronJobs(value: CronJob[])
    {
        this.cronJobs = value;
    }

    /**
     * Gets or sets the items to remove.
     */
    public get ItemsToRemove(): string[]
    {
        return this.itemsToRemove;
    }

    public set ItemsToRemove(value: string[])
    {
        this.itemsToRemove = value;
    }
}