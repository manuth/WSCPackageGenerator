import { Localizable } from "../../Localization/Localizable";
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
     * Gets or sets the name of the class providing the behavior of the cronjob.
     */
    ClassName: string;

    /**
     * Gets or sets the description of the cronjob.
     */
    Description?: Localizable;

    /**
     * Gets or sets the time-point of the cronjob.
     */
    TimePoint: TimePoint;

    /**
     * Gets or sets a value indicating whether editing the cronjob is allowed.
     */
    AllowEdit?: boolean;

    /**
     * Gets or sets a value indicating whether disabling the cronjob is allowed.
     */
    AllowDisable?: boolean;

    /**
     * Gets or sets the options of which at least one must be enabled in order to execute the cronjob.
     */
    Options?: Option[];
}