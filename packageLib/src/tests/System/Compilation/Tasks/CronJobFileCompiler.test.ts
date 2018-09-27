import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { CronJobFileCompiler } from "../../../../System/Compilation/Tasks/CronJobFileCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
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
        let className: string;
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
                className = "foo\\bar";
                period = new TimePeriod("2", "5", "7", "Jan", "*");

                instruction = new CronJobInstruction(
                    {
                        FileName: "cronJobs.xml",
                        CronJobs: [
                            {
                                Name: cronJobName,
                                ClassName: className,
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

                suite(
                    "Testing the integrity of the created file...",
                    () =>
                    {
                        let element: Element;
                        let document: Document;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                element = document.documentElement;
                            });

                        test(
                            "Checking whether the tag-name of the document-element is correct...",
                            () =>
                            {
                                assert.strictEqual(element.tagName, "data");
                            });

                        test(
                            "Checking whether the `import`-tag is present...",
                            () =>
                            {
                                assert.strictEqual(document.documentElement.getElementsByTagName("import").length, 1);

                                let importElement: Element = element.getElementsByTagName("import")[0];
                                assert.strictEqual(importElement.parentNode === element, true);
                                element = importElement;
                                assert.strictEqual(element.tagName, "import");
                            });

                        test(
                            "Checking whether the actual cron-job is present...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("cronjob").length, 1);

                                let cronJobElement: Element = element.getElementsByTagName("cronjob")[0];
                                assert.strictEqual(cronJobElement.parentNode === element, true);
                                element = cronJobElement;
                                assert.strictEqual(element.tagName, "cronjob");
                            });

                        test(
                            "Checking wheth er the cron-job name is correct...",
                            () =>
                            {
                                assert.strictEqual(element.hasAttribute("name"), true);
                                assert.strictEqual(element.getAttribute("name"), cronJobName);
                            });

                        test(
                            "Checking whether the class-name is correct...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("classname").length, 1);
                                assert.strictEqual(element.getElementsByTagName("classname")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("classname")[0].textContent, className);
                            });

                        test(
                            "Checking whether the time-period is correct...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("startminute").length, 1);
                                assert.strictEqual(element.getElementsByTagName("startminute")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("startminute")[0].textContent, period.Minute);

                                assert.strictEqual(element.getElementsByTagName("starthour").length, 1);
                                assert.strictEqual(element.getElementsByTagName("starthour")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("starthour")[0].textContent, period.Hour);

                                assert.strictEqual(element.getElementsByTagName("startdom").length, 1);
                                assert.strictEqual(element.getElementsByTagName("startdom")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("startdom")[0].textContent, period.DayOfMonth);

                                assert.strictEqual(element.getElementsByTagName("startmonth").length, 1);
                                assert.strictEqual(element.getElementsByTagName("startmonth")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("startmonth")[0].textContent, period.Month);

                                assert.strictEqual(element.getElementsByTagName("startdow").length, 1);
                                assert.strictEqual(element.getElementsByTagName("startdow")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("startdow")[0].textContent, period.DayOfWeek);
                            });

                        test(
                            "Checking other settings...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("canbedisabled").length, 1);
                                assert.strictEqual(element.getElementsByTagName("canbedisabled")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("canbedisabled")[0].textContent, instruction.CronJobs[0].AllowDisable ? "1" : "0");

                                assert.strictEqual(element.getElementsByTagName("canbeedited").length, 1);
                                assert.strictEqual(element.getElementsByTagName("canbeedited")[0].parentNode === element, true);
                                assert.strictEqual(element.getElementsByTagName("canbeedited")[0].textContent, instruction.CronJobs[0].AllowEdit ? "1" : "0");
                            });
                    });
            });
    });