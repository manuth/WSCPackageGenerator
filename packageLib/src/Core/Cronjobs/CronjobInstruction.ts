import { isNullOrUndefined } from "util";
import { FileInstruction } from "../../Automation/FileInstruction";
import { Cronjob } from "./Cronjob";
import { ICronjobInstructionOptions } from "./ICronjobInstructionOptions";

/**
 * Represents an instruction that provides cronjobs.
 */
export class CronjobInstruction extends FileInstruction implements ICronjobInstructionOptions
{
    /**
     * The cron-jobs provided by the instruction.
     */
    private cronJobs: Cronjob[] = [];

    /**
     * Initializes a new instance of the `CronjobInstruction` class.
     */
    public constructor(options: ICronjobInstructionOptions)
    {
        super(options);

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = "cronJobs.xml";
        }

        this.cronJobs = options.Cronjobs;
    }

    public get Cronjobs(): Cronjob[]
    {
        return this.cronJobs;
    }

    public set Cronjobs(value: Cronjob[])
    {
        this.cronJobs = value;
    }
}