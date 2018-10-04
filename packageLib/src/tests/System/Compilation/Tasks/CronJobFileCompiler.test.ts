import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { CronJobFileCompiler } from "../../../../System/Compilation/Tasks/CronJobFileCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { CronJobInstruction } from "../../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../../System/PackageSystem/Package";
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
                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

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

                $package.InstallSet.push(instruction);
                compiler = new CronJobFileCompiler(instruction);
                compiler.DestinationPath = tempFile.FileName;
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

                        test(
                            "Checking whether the expected file exists...",
                            async () =>
                            {
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FileName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the created file...",
                    () =>
                    {
                        let document: Document;
                        let rootTag: string;
                        let rootEditor: XMLEditor;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "data";
                                rootEditor = new XMLEditor(document.documentElement);
                            });

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.TagName, rootTag);
                                    });
                            });

                        suite(
                            "Checking the interity of the imported components...",
                            () =>
                            {
                                let importEditor: XMLEditor;
                                let importTag: string;

                                suiteSetup(
                                    () =>
                                    {
                                        importTag = "import";
                                    });

                                suite(
                                    "General",
                                    () =>
                                    {
                                        test(
                                            "Checking whether the import-list is present...",
                                            () =>
                                            {
                                                rootEditor.AssertTag(importTag, true);
                                                importEditor = rootEditor.ChildrenByTag(importTag)[0];
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
                                                        importEditor.AssertTag(cronJobTag, true);
                                                        cronJobEditor = importEditor.ChildrenByTag(cronJobTag)[0];
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
                                                        cronJobEditor.AssertText(classTag, className);
                                                    });

                                                test(
                                                    "Checking whether the localized description is correct...",
                                                    () =>
                                                    {
                                                        for (let editor of cronJobEditor.ChildrenByTag(descriptionTag))
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
                                                        cronJobEditor.AssertText(disableTag, allowDisable ? "1" : "0");
                                                        cronJobEditor.AssertText(editTag, allowEdit ? "1" : "0");
                                                    });

                                                test(
                                                    "Checking whether the options are correct...",
                                                    () =>
                                                    {
                                                        cronJobEditor.AssertText(optionsTag, options.join(","));
                                                    });

                                                test(
                                                    "Checking whether the time-period is correct...",
                                                    () =>
                                                    {
                                                        cronJobEditor.AssertText(minuteTag, period.Minute);
                                                        cronJobEditor.AssertText(hourTag, period.Hour);
                                                        cronJobEditor.AssertText(dayOfMonthTag, period.DayOfMonth);
                                                        cronJobEditor.AssertText(monthTag, period.Month);
                                                        cronJobEditor.AssertText(dayOfWeekTag, period.DayOfWeek);
                                                    });
                                            });
                                    });
                            });

                    });
            });
    });