/**
 * Represents a time-point of a cron-tab.
 */
export class TimePoint
{
    /**
     * The minute-periode of the time-point. Gets or sets the minute-periode of the time-point.
     */
    private minute: string;

    /**
     * The hour-periode of the time-point.
     */
    private hour: string;

    /**
     * The month of the time-point.
     */
    private dayOfMonth: string;

    /**
     * The month-periode of the time-point.
     */
    private month: string;

    /**
     * The week of the time-point.
     */
    private dayOfWeek: string;

    /**
     * 
     * @param minute
     * The minute-periode of the time-point. Gets or sets the minute-periode of the time-point.
     * 
     * @param hour
     * The hour-periode of the time-point.
     * 
     * @param dayOfMonth
     * The month of the time-point.
     * 
     * @param month
     * The month-periode of the time-point.
     * 
     * @param dayOfWeek
     * The week of the time-point.
     */
    public constructor(minute: string, hour: string, dayOfMonth: string, month: string, dayOfWeek: string)
    {
        this.minute = minute;
        this.hour = hour;
        this.dayOfMonth = dayOfMonth;
        this.month = month;
        this.dayOfWeek = dayOfWeek;
    }

    /**
     * Gets a yearly time-point.
     */
    public static get Yearly(): TimePoint
    {
        return new TimePoint("0", "0", "1", "Jan", "*");
    }

    /**
     * Gets a monthly time-point.
     */
    public static get Monthly(): TimePoint
    {
        return new TimePoint("0", "0", "1", "*", "*");
    }

    /**
     * Gets a weekly time-point.
     */
    public static get Weekly(): TimePoint
    {
        return new TimePoint("0", "0", "*", "*", "Mon");
    }

    /**
     * Gets a daily time-point.
     */
    public static get Daily(): TimePoint
    {
        return new TimePoint("0", "0", "*", "*", "*");
    }

    /**
     * Gets a hourly time-point.
     */
    public static get Hourly(): TimePoint
    {
        return new TimePoint("0", "*", "*", "*", "*");
    }

    public get Minute(): string
    {
        return this.minute;
    }

    public set Minute(value: string)
    {
        this.minute = value;
    }

    public get Hour(): string
    {
        return this.hour;
    }

    public set Hour(value: string)
    {
        this.hour = value;
    }

    public get DayOfMonth(): string
    {
        return this.dayOfMonth;
    }

    public set DayOfMonth(value: string)
    {
        this.dayOfMonth = value;
    }

    public get Month(): string
    {
        return this.month;
    }

    public set Month(value: string)
    {
        this.month = value;
    }

    public get DayOfWeek(): string
    {
        return this.dayOfWeek;
    }

    public set DayOfWeek(value: string)
    {
        this.dayOfWeek = value;
    }
}