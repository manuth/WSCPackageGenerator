/**
 * Represents a time-period.
 */
export class TimePeriod
{
    /**
     * The minute of the period.
     */
    private minute: string;

    /**
     * The hour of the period.
     */
    private hour: string;

    /**
     * The day of the month of the period.
     */
    private dayOfMonth: string;

    /**
     * The month of the period.
     */
    private month: string;

    /**
     * The day of the week of the period.
     */
    private dayOfWeek: string;

    /**
     * Initializes a new instance of the `TimePeriod` class.
     *
     * @param minute
     * The minute of the period.
     *
     * @param hour
     * The hour of the period.
     *
     * @param dayOfMonth
     * The day of the month of the period.
     *
     * @param month
     * The month of the period.
     *
     * @param dayOfWeek
     * The day of the week of the period.
     */
    public constructor(minute: string, hour: string, dayOfMonth: string, month: string, dayOfWeek: string)
    {
        this.Minute = minute;
        this.Hour = hour;
        this.DayOfMonth = dayOfMonth;
        this.Month = month;
        this.DayOfWeek = dayOfWeek;
    }

    /**
     * Gets a yearly period.
     */
    public static get Yearly(): TimePeriod
    {
        return new TimePeriod("0", "0", "1", "Jan", "*");
    }

    /**
     * Gets a monthly period.
     */
    public static get Monthly(): TimePeriod
    {
        return new TimePeriod("0", "0", "1", "*", "*");
    }

    /**
     * Gets a weekly period.
     */
    public static get Weekly(): TimePeriod
    {
        return new TimePeriod("0", "0", "*", "*", "Mon");
    }

    /**
     * Gets a daily period.
     */
    public static get Daily(): TimePeriod
    {
        return new TimePeriod("0", "0", "*", "*", "*");
    }

    /**
     * Gets an hourly period.
     */
    public static get Hourly(): TimePeriod
    {
        return new TimePeriod("0", "*", "*", "*", "*");
    }

    /**
     * Gets or sets the minute of the period.
     */
    public get Minute(): string
    {
        return this.minute;
    }

    public set Minute(value: string)
    {
        this.minute = value;
    }

    /**
     * Gets or sets the hour of the period.
     */
    public get Hour(): string
    {
        return this.hour;
    }

    public set Hour(value: string)
    {
        this.hour = value;
    }

    /**
     * Gets or sets the day of the month of the period.
     */
    public get DayOfMonth(): string
    {
        return this.dayOfMonth;
    }

    public set DayOfMonth(value: string)
    {
        this.dayOfMonth = value;
    }

    /**
     * Gets or sets the month of the period.
     */
    public get Month(): string
    {
        return this.month;
    }

    public set Month(value: string)
    {
        this.month = value;
    }

    /**
     * Gets or sets the day of the week of the period.
     */
    public get DayOfWeek(): string
    {
        return this.dayOfWeek;
    }

    public set DayOfWeek(value: string)
    {
        this.dayOfWeek = value;
    }
}