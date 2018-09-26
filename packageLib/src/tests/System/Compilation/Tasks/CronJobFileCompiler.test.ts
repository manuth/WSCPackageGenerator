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
                period = new TimePeriod("2", "5", "7", "Jan", "*");

                instruction = new CronJobInstruction(
                    {
                        FileName: "cronJobs.xml",
                        CronJobs: [
                            {
                                Name: cronJobName,
                                ClassName: "foo\\bar",
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

                test(
                    "Checking whether the content of the file is correct...",
                    async () =>
                    {
                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                        assert.strictEqual(document.getElementsByTagName("startminute")[0].textContent, period.Minute);
                        assert.strictEqual(document.getElementsByTagName("starthour")[0].textContent, period.Hour);
                        assert.strictEqual(document.getElementsByTagName("startdom")[0].textContent, period.DayOfMonth);
                        assert.strictEqual(document.getElementsByTagName("startmonth")[0].textContent, period.Month);
                        assert.strictEqual(document.getElementsByTagName("startdow")[0].textContent, period.DayOfWeek);
                    });
            });
    });