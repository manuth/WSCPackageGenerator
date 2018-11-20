import * as assert from "assert";
import * as parser from "cron-parser";
import { TimePeriod } from "../../../System/Tasks/TimePeriod";

suite("TimePeriod",
    () =>
    {
        // tslint:disable-next-line:typedef
        let cronExpressionType = parser.parseExpression("* * * * * *");
        let periodConverter: (value: TimePeriod) => typeof cronExpressionType;
        let period: typeof cronExpressionType;
        let startDate: Date;
        let endDate: Date;

        suiteSetup(
            () =>
            {
                startDate = new Date();
                endDate = new Date();

                periodConverter = (value: TimePeriod): typeof cronExpressionType =>
                {
                    return parser.parseExpression(
                        `${value.Minute} ${value.Hour} ${value.DayOfMonth} ${value.Month} ${value.DayOfWeek}`,
                        {
                            currentDate: startDate
                        });
                };
            });

        setup(
            () =>
            {
                startDate = new Date(period.next().getTime());
                endDate = new Date(startDate);
                period.reset();
            });

        suite(
            "Yearly",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        period = periodConverter(TimePeriod.Yearly);
                    });

                test(
                    "Checking whether the `TimePeriod.Yearly`-period is triggered every year...",
                    () =>
                    {
                        endDate.setFullYear(endDate.getFullYear() + 1);
                        assert.strictEqual(
                            period.next().getTime() - period.next().getTime(),
                            startDate.getTime() - endDate.getTime());
                    });
            });

        suite(
            "Monthly",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        period = periodConverter(TimePeriod.Monthly);
                    });

                test(
                    "Checking whether the `TimePeriod.Monthly`-period is triggered every month...",
                    () =>
                    {
                        endDate.setMonth(endDate.getMonth() + 1);
                        assert.strictEqual(
                            period.next().getTime() - period.next().getTime(),
                            startDate.getTime() - endDate.getTime());
                    });
            });

        suite(
            "Weekly",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        period = periodConverter(TimePeriod.Weekly);
                    });

                test(
                    "Checking whether the `TimePeriod.Weekly`-period is triggered every week...",
                    () =>
                    {
                        endDate.setDate(endDate.getDate() + 7);
                        assert.strictEqual(
                            period.next().getTime() - period.next().getTime(),
                            startDate.getTime() - endDate.getTime());
                    });
            });

        suite(
            "Daily",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        period = periodConverter(TimePeriod.Daily);
                    });

                test(
                    "Checking whether the `TimePeriod.Daily`-period is triggered every day...",
                    () =>
                    {
                        endDate.setDate(endDate.getDate() + 1);
                        assert.strictEqual(
                            period.next().getTime() - period.next().getTime(),
                            startDate.getTime() - endDate.getTime());
                    });
            });

        suite(
            "Hourly",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        period = periodConverter(TimePeriod.Hourly);
                    });

                test(
                    "Checking whether the `TimePeriod.Hourly`-period is triggered every hour...",
                    () =>
                    {
                        endDate.setHours(endDate.getHours() + 1);
                        assert.strictEqual(
                            period.next().getTime() - period.next().getTime(),
                            startDate.getTime() - endDate.getTime());
                    });
            });
    });