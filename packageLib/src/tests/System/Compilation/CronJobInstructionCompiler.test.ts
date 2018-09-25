import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { CronJobInstructionCompiler } from "../../../System/Compilation/CronJobInstructionCompiler";
import { TempDirectory } from "../../../System/FileSystem/TempDirectory";
import { CronJobInstruction } from "../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../System/PackageSystem/Package";
import { TimePeriod } from "../../../System/Tasks/TimePeriod";

suite(
    "CronJobInstructionCompiler",
    () =>
    {
        let packageDir: TempDirectory;
        let fileName: string;
        let compiler: CronJobInstructionCompiler;
        let instruction: CronJobInstruction;
        let cronJobName: string;
        let period: TimePeriod;

        suiteSetup(
            () =>
            {
                packageDir = new TempDirectory();
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
                compiler = new CronJobInstructionCompiler(instruction);
                compiler.DestinationPath = packageDir.FileName;
                fileName = compiler.DestinationFileName;
            });

        suiteTeardown(
            () =>
            {
                packageDir.Dispose();
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
                        assert.strictEqual(await FileSystem.pathExists(fileName), true);
                    });

                test(
                    "Checking whether the content of the file is correct...",
                    async () =>
                    {
                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(fileName)).toString());
                        assert.strictEqual(document.getElementsByTagName("startminute")[0].textContent, period.Minute);
                        assert.strictEqual(document.getElementsByTagName("starthour")[0].textContent, period.Hour);
                        assert.strictEqual(document.getElementsByTagName("startdom")[0].textContent, period.DayOfMonth);
                        assert.strictEqual(document.getElementsByTagName("startmonth")[0].textContent, period.Month);
                        assert.strictEqual(document.getElementsByTagName("startdow")[0].textContent, period.DayOfWeek);
                    });
            });
    });