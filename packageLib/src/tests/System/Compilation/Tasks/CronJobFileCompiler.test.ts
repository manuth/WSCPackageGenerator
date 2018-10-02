import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { CronJobFileCompiler } from "../../../../System/Compilation/Tasks/CronJobFileCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { CronJobInstruction } from "../../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../../System/PackageSystem/Package";
import { TimePeriod } from "../../../../System/Tasks/TimePeriod";

suite(
    "CronJobFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: CronJobFileCompiler;
        let instruction: CronJobInstruction;
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

                instruction = new CronJobInstruction(
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
                        let importTag: string;
                        let rootElement: Element;
                        let importElement: Element;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "data";
                                importTag = "import";
                                rootElement = document.documentElement;

                                assert.strictEqual(document.getElementsByTagName(importTag).length, 1);
                                importElement = document.getElementsByTagName(importTag)[0];
                                assert.strictEqual(importElement.parentNode === rootElement, true);
                            });

                        suite(
                            "Testing the XML-document...",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.tagName, rootTag);
                                    });
                            });

                        suite(
                            "Testing the integrity of imported cron-jobs...",
                            () =>
                            {
                                let cronJobTag: string;
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

                                let cronJobElement: Element;
                                let classElement: Element;
                                let descriptionElements: Element[];
                                let disableElement: Element;
                                let editElement: Element;
                                let optionsElement: Element;
                                let minuteElement: Element;
                                let hourElement: Element;
                                let dayOfMonthElement: Element;
                                let monthElement: Element;
                                let dayOfWeekElement: Element;

                                suiteSetup(
                                    () =>
                                    {
                                        cronJobTag = "cronjob";
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

                                        assert.strictEqual(document.getElementsByTagName(cronJobTag).length, 1);
                                        cronJobElement = document.getElementsByTagName(cronJobTag)[0];
                                        assert.strictEqual(cronJobElement.parentNode === importElement, true);

                                        assert.strictEqual(document.getElementsByTagName(classTag).length, 1);
                                        classElement = document.getElementsByTagName(classTag)[0];
                                        assert.strictEqual(classElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(disableTag).length, 1);
                                        disableElement = document.getElementsByTagName(disableTag)[0];
                                        assert.strictEqual(disableElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(editTag).length, 1);
                                        editElement = document.getElementsByTagName(editTag)[0];
                                        assert.strictEqual(editElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(optionsTag).length, 1);
                                        optionsElement = document.getElementsByTagName(optionsTag)[0];
                                        assert.strictEqual(optionsElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(minuteTag).length, 1);
                                        minuteElement = document.getElementsByTagName(minuteTag)[0];
                                        assert.strictEqual(minuteElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(hourTag).length, 1);
                                        hourElement = document.getElementsByTagName(hourTag)[0];
                                        assert.strictEqual(hourElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(dayOfMonthTag).length, 1);
                                        dayOfMonthElement = document.getElementsByTagName(dayOfMonthTag)[0];
                                        assert.strictEqual(dayOfMonthElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(monthTag).length, 1);
                                        monthElement = document.getElementsByTagName(monthTag)[0];
                                        assert.strictEqual(monthElement.parentNode === cronJobElement, true);

                                        assert.strictEqual(document.getElementsByTagName(dayOfWeekTag).length, 1);
                                        dayOfWeekElement = document.getElementsByTagName(dayOfWeekTag)[0];
                                        assert.strictEqual(dayOfWeekElement.parentNode === cronJobElement, true);

                                        descriptionElements = [];

                                        let descriptionNodes: NodeListOf<Element> = document.getElementsByTagName(descriptionTag);

                                        for (let i: number = 0; i < descriptionNodes.length; i++)
                                        {
                                            descriptionElements.push(descriptionNodes.item(i));
                                        }
                                    });

                                test(
                                    "Checking the name of the cron-job...",
                                    () =>
                                    {
                                        assert.strictEqual(cronJobElement.getAttribute(nameAttribute), cronJobName);
                                    });

                                test(
                                    "Checking the class-name of the cron-job...",
                                    () =>
                                    {
                                        assert.strictEqual(classElement.textContent, className);
                                    });

                                test(
                                    "Checking whether the localized description is correct...",
                                    () =>
                                    {
                                        let localizedElement: Element;
                                        let localizedElements: Element[] = descriptionElements.filter(
                                            (node: Element): boolean =>
                                            {
                                                return node.hasAttribute(languageAttribute);
                                            });

                                        assert.strictEqual(localizedElements.length, 1);
                                        localizedElement = localizedElements[0];
                                        assert.strictEqual(localizedElement.parentNode === cronJobElement, true);
                                        assert.strictEqual(localizedElement.textContent, localizedDescription);
                                    });

                                test(
                                    "Checking whether the invariant description is correct...",
                                    () =>
                                    {
                                        let invariantElement: Element;
                                        let invariantElements: Element[] = descriptionElements.filter(
                                            (node: Element): boolean =>
                                            {
                                                return !node.hasAttribute(languageAttribute);
                                            });

                                        assert.strictEqual(invariantElements.length, 1);
                                        invariantElement = invariantElements[0];
                                        assert.strictEqual(invariantElement.parentNode === cronJobElement, true);
                                        assert.strictEqual(invariantElement.textContent, invariantDescription);
                                    });

                                test(
                                    "Checking whether the permission-settings are correct...",
                                    () =>
                                    {
                                        assert.strictEqual(disableElement.textContent, allowDisable ? "1" : "0");
                                        assert.strictEqual(editElement.textContent, allowEdit ? "1" : "0");
                                    });

                                test(
                                    "Checking whether the options are correct...",
                                    () =>
                                    {
                                        assert.strictEqual(optionsElement.textContent, options.join(","));
                                    });

                                test(
                                    "Checking whether the time-period is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(minuteElement.textContent, period.Minute);
                                        assert.strictEqual(hourElement.textContent, period.Hour);
                                        assert.strictEqual(dayOfMonthElement.textContent, period.DayOfMonth);
                                        assert.strictEqual(monthElement.textContent, period.Month);
                                        assert.strictEqual(dayOfWeekElement.textContent, period.DayOfWeek);
                                    });
                            });
                    });
            });
    });