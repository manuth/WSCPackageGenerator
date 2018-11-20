import { ILocalization } from "../Globalization/ILocalization";
import { TimePeriod } from "./TimePeriod";

/**
 * Provides options for the `CronJob` class.
 */
export interface ICronJobOptions
{
    /**
     * The name of the cron-job.
     */
    Name: string;

    /*
     * The class-name of the cron-job.
     */
    ClassName: string;

    /**
     * The description of the cron-job.
     */
    Description?: ILocalization;

    /**
     * A value indicating whether the cron-job can be disabled.
     */
    AllowDisable?: boolean;

    /**
     * A value indicating whether the cron-job can be edited.
     */
    AllowEdit?: boolean;

    /**
     * A set of options of which at least one must be enabled in order to execute the cron-job.
     */
    Options?: string[];

    /**
     * The period to execute the cron-job.
     */
    Period: TimePeriod;
}