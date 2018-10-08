import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { EventListenerInstructionCompiler } from "../../../../System/Compilation/Instructions/EventListenerInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { EventListenerInstruction } from "../../../../System/PackageSystem/Instructions/Events/EventListenerInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "EventListenerInstructionCompiler",
    () =>
    {
        let tempDir: TempDirectory;
        let fileName: string;
        let compiler: EventListenerInstructionCompiler;

        suiteSetup(
            () =>
            {
                let $package: Package = new Package(
                    {
                        Identifier: "test",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let instruction: EventListenerInstruction = new EventListenerInstruction(
                    {
                        FileName: "eventListeners.xml",
                        Listeners: []
                    });

                $package.InstallSet.push(instruction);
                compiler = new EventListenerInstructionCompiler(instruction);
                compiler.DestinationPath = tempDir.FileName;
                fileName = compiler.DestinationFileName;
            });

        test(
            "Checking whether the compiler can be executed...",
            async () =>
            {
                await compiler.Execute();
            });

        test(
            "Checking whether the compiled file exists...",
            async () =>
            {
                assert.strictEqual(await FileSystem.pathExists(fileName), true);
            });
    });