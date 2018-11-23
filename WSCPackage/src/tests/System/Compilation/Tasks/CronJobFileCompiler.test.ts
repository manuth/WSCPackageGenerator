import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { CronJobFileCompiler } from "../../../../System/Compilation/Tasks/CronJobFileCompiler";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { CronJobInstruction } from "../../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";
import { TimePeriod } from "../../../../System/Tasks/TimePeriod";

suite(
    "CronJobFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: CronJobFileCompiler;
        let cronJobName: string;
        let locale: string;
        let localizedDescription: string;
        let invariantDescription: string;
        let className: string;
        let allowDisable: boolean;
        let allowEdit: boolean;
        let options: string[];
        let period: TimePeriod;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                cronJobName = "bar";
                locale = "de";
                localizedDescription = "test-description";
                invariantDescription = "invariant-description-Test";
                className = "foo\\bar";
                allowDisable = true;
                allowEdit = false;
                options = ["foo", "bar", "baz"];
                period = new TimePeriod("2", "5", "7", "Jan", "*");

                let description: ILocalization = {};
                description[locale] = localizedDescription;
                description["inv"] = invariantDescription;

                let instruction: CronJobInstruction = new CronJobInstruction(
                    {
                        FileName: "cronJobs.xml",
                        CronJobs: [
                            {
                                Name: cronJobName,
                                Description: description,
                                ClassName: className,
                                AllowDisable: allowDisable,
                                AllowEdit: allowEdit,
                                Options: options,
                                Period: period
                            }
                        ]
                    });

                compiler = new CronJobFileCompiler(instruction);
                compiler.DestinationPath = tempFile.FullName;
            });

        suiteTeardown(
            () =>
            {
                tempFile.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                suite(
                    "General tests...",
                    () =>
                    {
                        test(
                            "Checking whether the instruction can be compiled without an error...",
                            async () =>
                            {
                                await compiler.Execute();
                            });
                    });

                suite(
                    "Testing the integrity of the created file...",
                    () =>
                    {
                        let importEditor: XMLEditor;

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the content of the compiled file is valid xml...",
                                    async () =>
                                    {
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                    });
                            });

                        suite(
                            "Checking the integrity of the cron-job...",
                            () =>
                            {
                                let cronJobTag: string;
                                let cronJobEditor: XMLEditor;

                                suiteSetup(
                                    () =>
                                    {
                                        cronJobTag = "cronjob";
                                    });

                                suite(
                                    "General",
                                    () =>
                                    {
                                        test(
                                            "Checking whether the cron-job is present...",
                                            () =>
                                            {
                                                assert.strictEqual(importEditor.HasTag(cronJobTag, true), true);
                                                cronJobEditor = importEditor.GetChildrenByTag(cronJobTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the meta-data of the cron-job",
                                    () =>
                                    {
                                        let classTag: string;
                                        let descriptionTag: string;
                                        let disableTag: string;
                                        let editTag: string;
                                        let optionsTag: string;
                                        let minuteTag: string;
                                        let hourTag: string;
                                        let dayOfMonthTag: string;
                                        let monthTag: string;
                                        let dayOfWeekTag: string;

                                        let nameAttribute: string;
                                        let languageAttribute: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                classTag = "classname";
                                                descriptionTag = "description";
                                                disableTag = "canbedisabled";
                                                editTag = "canbeedited";
                                                optionsTag = "options";
                                                minuteTag = "startminute";
                                                hourTag = "starthour";
                                                dayOfMonthTag = "startdom";
                                                monthTag = "startmonth";
                                                dayOfWeekTag = "startdow";

                                                nameAttribute = "name";
                                                languageAttribute = "language";
                                            });

                                        test(
                                            "Checking the name of the cron-job...",
                                            () =>
                                            {
                                                assert.strictEqual(cronJobEditor.GetAttribute(nameAttribute), cronJobName);
                                            });

                                        test(
                                            "Checking the class-name of the cron-job...",
                                            () =>
                                            {
                                                assert.strictEqual(cronJobEditor.HasText(classTag, className), true);
                                            });

                                        test(
                                            "Checking whether the localized description is correct...",
                                            () =>
                                            {
                                                for (let editor of cronJobEditor.GetChildrenByTag(descriptionTag))
                                                {
                                                    if (editor.HasAttribute(languageAttribute))
                                                    {
                                                        assert.strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                    }

                                                    assert.strictEqual(editor.TextContent, editor.HasAttribute(languageAttribute) ? localizedDescription : invariantDescription);
                                                }
                                            });

                                        test(
                                            "Checking whether the permission-settings are correct...",
                                            () =>
                                            {
                                                assert.strictEqual(cronJobEditor.HasText(disableTag, allowDisable ? "1" : "0"), true);
                                                assert.strictEqual(cronJobEditor.HasText(editTag, allowEdit ? "1" : "0"), true);
                                            });

                                        test(
                                            "Checking whether the options are correct...",
                                            () =>
                                            {
                                                assert.strictEqual(cronJobEditor.GetText(optionsTag), options.join(","));
                                            });

                                        test(
                                            "Checking whether the time-period is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(cronJobEditor.HasText(minuteTag, period.Minute), true);
                                                assert.strictEqual(cronJobEditor.HasText(hourTag, period.Hour), true);
                                                assert.strictEqual(cronJobEditor.HasText(dayOfMonthTag, period.DayOfMonth), true);
                                                assert.strictEqual(cronJobEditor.HasText(monthTag, period.Month), true);
                                                assert.strictEqual(cronJobEditor.HasText(dayOfWeekTag, period.DayOfWeek), true);
                                            });
                                    });
                            });
                    });

            });
    });