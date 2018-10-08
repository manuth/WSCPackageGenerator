import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TemplateListenerInstructionCompiler } from "../../../../System/Compilation/Instructions/TemplateListenerInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { TemplateListenerInstruction } from "../../../../System/PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "TemplateListenerInstructionCompiler",
    () =>
    {
        let tempDir: TempDirectory;
        let fileName: string;
        let compiler: TemplateListenerInstructionCompiler;

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

                let instruction: TemplateListenerInstruction = new TemplateListenerInstruction(
                    {
                        FileName: "eventListeners.xml",
                        Listeners: []
                    });

                $package.InstallSet.push(instruction);
                compiler = new TemplateListenerInstructionCompiler(instruction);
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