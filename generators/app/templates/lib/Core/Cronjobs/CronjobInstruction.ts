import Cronjob from "./Cronjob";
import FileInstruction from "../../Automation/FileInstruction";
import ICronjobInstruction from "./ICronjobInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides chron-jobs.
 */
export default class CronjobInstruction extends FileInstruction implements ICronjobInstruction
{
    /**
     * The cron-jobs provided by the instruction.
     */
    private cronJobs: Cronjob[] = [];

    /**
     * Initializes a new instance of the `CronjobInstruction` class.
     */
    public constructor(options: ICronjobInstruction)
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