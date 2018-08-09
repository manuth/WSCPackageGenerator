import ICronjobOptions from "./ICronjobOptions";
import Localizable from "../../GLobalization/Localizable";
import TimePoint from "./TimePoint";
import Option from "../../Options/ControlPanel/Option";
import { isNullOrUndefined } from "util";

/**
 * Represents a cron-job.
 */
export default class Cronjob implements ICronjobOptions
{
    /**
     * The name of the cron-job.
     */
    private name: string;

    /**
     * The name of the class providing the cronjob's behavior.
     */
    private className: string;

    /**
     * The description of the cron-job.
     */
    private description: Localizable = {};

    /**
     * The time-point of the cron-job.
     */
    private timePoint: TimePoint;

    /**
     * A value indicating whether editing the cron-job is allowed.
     */
    private allowEdit: boolean = false;

    /**
     * A value indicating whether disabling the cron-job is allowed.
     */
    private canDisable: boolean = false;

    /**
     * The options of which at least one must be enabled in order to execute the listener.
     */
    private options: Option[] = [];

    /**
     * Initializes a new instance of the `Conrjob` class.
     */
    public constructor(options: ICronjobOptions)
    {
        this.name = options.Name;
        this.className = options.ClassName;
        this.timePoint = options.TimePoint;

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.description, options.Description);
        }

        if (!isNullOrUndefined(options.AllowEdit))
        {
            this.allowEdit = options.AllowEdit;
        }

        if (!isNullOrUndefined(options.AllowDisable))
        {
            this.canDisable = options.AllowDisable;
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.options = options.Options;
        }
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get ClassName(): string
    {
        return this.className;
    }

    public set ClassName(value: string)
    {
        this.className = value;
    }

    public get Description(): Localizable
    {
        return this.description;
    }

    public get TimePoint(): TimePoint
    {
        return this.timePoint;
    }

    public get AllowEdit(): boolean
    {
        return this.allowEdit;
    }

    public set AllowEdit(value: boolean)
    {
        this.allowEdit = value;
    }

    public get AllowDisable(): boolean
    {
        return this.canDisable;
    }

    public set AllowDisable(value: boolean)
    {
        this.canDisable = value;
    }

    public get Options(): Option[]
    {
        return this.options;
    }

    public set Options(value: Option[])
    {
        this.options = value;
    }
}