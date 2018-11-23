import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { CronJobInstructionCompiler } from "../../../../System/Compilation/PackageSystem/Instructions/CronJobInstructionCompiler";
import { ACPOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CronJobInstruction } from "../../../../System/PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../../System/PackageSystem/Package";
import { TimePeriod } from "../../../../System/Tasks/TimePeriod";

suite(
    "CronJobInstructionCompiler",
    () =>
    {
        let tempDir: TempDirectory;
        let fileName: string;
        let compiler: CronJobInstructionCompiler;
        let instruction: CronJobInstruction;

        suiteSetup(
            () =>
            {
                tempDir = new TempDirectory();
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

                instruction = new CronJobInstruction(
                    {
                        FileName: "cronJobs.xml",
                        CronJobs: [
                            {
                                Name: "foo",
                                ClassName: "bar",
                                Period: TimePeriod.Monthly
                            }
                        ]
                    });

                $package.InstallSet.push(instruction);
                compiler = new CronJobInstructionCompiler(instruction);
                compiler.DestinationPath = tempDir.FullName;
                fileName = compiler.DestinationFileName;
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
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
            });
    });