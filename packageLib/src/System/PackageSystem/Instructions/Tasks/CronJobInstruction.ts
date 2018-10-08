import { CronJobInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { CronJob } from "../../../Tasks/CronJob";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction";
import { ICronJobInstructionOptions } from "./ICronJobInstructionOptions";

/**
 * Represents an instruction which install cron-jobs.
 */
export class CronJobInstruction extends NamedDeleteInstruction
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

    public get Compiler(): InstructionCompiler<CronJobInstruction>
    {
        return new CronJobInstructionCompiler(this);
    }
}