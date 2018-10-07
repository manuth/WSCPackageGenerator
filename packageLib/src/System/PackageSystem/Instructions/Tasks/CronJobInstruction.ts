import { CronJob } from "../../../Tasks/CronJob";
import { Instruction } from "../Instruction";
import { ICronJobInstructionOptions } from "./ICronJobInstructionOptions";

/**
 * Represents an instruction which install cron-jobs.
 */
export class CronJobInstruction extends Instruction
{
    /**
     * The cron-jobs provided by the instruction.
     */
    private cronJobs: CronJob[] = [];

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
}