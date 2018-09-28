import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { CronJobInstructionCompiler } from "../../../../System/Compilation/Instructions/CronJobInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { ACPOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CronJobInstruction } from "../../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../../System/PackageSystem/Package";
import { TimePeriod } from "../../../../System/Tasks/TimePeriod";

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
                            Instructions: [
                                new ACPOptionInstruction(
                                    {
                                        FileName: null,
                                        Nodes: [
                                            {
                                                ID: "foo",
                                                Name: "this-is-a-test"
                                            }
                                        ]
                                    })
                            ]
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
                                Period: period,
                                Options: ["<%= $('foo') %>"]
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
                    "Checking whether ejs-strings are replaced correctly...",
                    async () =>
                    {
                        (await FileSystem.readFile(fileName)).toString().includes("this-is-a-test");
                    });
            });
    });