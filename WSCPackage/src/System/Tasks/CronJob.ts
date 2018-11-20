import { isNullOrUndefined } from "util";
import { Localization } from "../Globalization/Localization";
import { ICronJobOptions } from "./ICronJobOptions";
import { TimePeriod } from "./TimePeriod";

/**
 * Represents a cron-job.
 */
export class CronJob
{
    /**
     * The name of the cron-job.
     */
    private name: string;

    /**
     * The class-name of the cron-job.
     */
    private className: string;

    /**
     * The description of the cron-job.
     */
    private description = new Localization();

    /**
     * A value indicating whether the cron-job can be disabled.
     */
    private allowDisable = false;

    /**
     * A value indicating whether the cron-job can be edited.
     */
    private allowEdit = false;

    /**
     * A set of options of which at least one must be enabled in order to execute the cron-job.
     */
    private options: string[] = [];

    /**
     * The period to execute the cron-job.
     */
    private period: TimePeriod;

    /**
     * Initializes a new instance of the `CronJob` class.
     */
    public constructor(options: ICronJobOptions)
    {
        if (!isNullOrUndefined(options.Name))
        {
            this.Name = options.Name;
        }

        this.ClassName = options.ClassName;

        if (!isNullOrUndefined(options.Description))
        {
            this.Description.Data = options.Description;
        }

        if (!isNullOrUndefined(options.AllowDisable))
        {
            this.AllowDisable = options.AllowDisable;
        }

        if (!isNullOrUndefined(options.AllowEdit))
        {
            this.AllowEdit = options.AllowEdit;
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.Options = options.Options;
        }

        this.Period = options.Period;
    }

    /**
     * Gets or sets the name of the cron-job.
     */
    public get Name()
    {
        return this.name;
    }

    public set Name(value)
    {
        this.name = value;
    }

    /**
     * Gets or sets the class-name of the cron-job.
     */
    public get ClassName()
    {
        return this.className;
    }

    public set ClassName(value)
    {
        this.className = value;
    }

    /**
     * Gets the description of the cron-job.
     */
    public get Description()
    {
        return this.description;
    }

    /**
     * Gets or sets a value indicating whether the cron-job can be disabled.
     */
    public get AllowDisable()
    {
        return this.allowDisable;
    }

    public set AllowDisable(value)
    {
        this.allowDisable = value;
    }

    /**
     * Gets or sets a value indicating whether the cron-job can be edited.
     */
    public get AllowEdit()
    {
        return this.allowEdit;
    }

    public set AllowEdit(value)
    {
        this.allowEdit = value;
    }

    /**
     * Gets or sets a set of options of which at least one must be enabled in order to execute the cron-job.
     */
    public get Options()
    {
        return this.options;
    }

    public set Options(value)
    {
        this.options = value;
    }

    /**
     * Gets or sets the period to execute the cron-job.
     */
    public get Period()
    {
        return this.period;
    }

    public set Period(value)
    {
        this.period = value;
    }
}