import { Localizable } from "../../GLobalization/Localizable";
import { Option } from "../../Options/ControlPanel/Option";
import { TimePoint } from "./TimePoint";

/**
 * Provides options for the `ICronjob` interface.
 */
export interface ICronjobOptions
{
    /**
     * Gets or sets the name of the cron-job.
     */
    Name: string;

    /**
     * Gets or sets the name of the class providing the cronjob's behavior.
     */
    ClassName: string;

    /**
     * Gets or sets the description of the cron-job.
     */
    Description?: Localizable;

    /**
     * Gets or sets the time-point of the cron-job.
     */
    TimePoint: TimePoint;

    /**
     * Gets or sets a value indicating whether editing the cron-job is allowed.
     */
    AllowEdit?: boolean;

    /**
     * Gets or sets a value indicating whether disabling the cron-job is allowed.
     */
    AllowDisable?: boolean;

    /**
     * Gets or sets the options of which at least one must be enabled in order to execute the cron-job.
     */
    Options?: Option[];
}