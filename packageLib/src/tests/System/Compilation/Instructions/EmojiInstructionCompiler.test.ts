import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { EmojiInstructionCompiler } from "../../../../System/Compilation/Instructions/EmojiInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { EmojiInstruction } from "../../../../System/PackageSystem/Instructions/Customization/EmojiInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "EmojiInstructionCompiler",
    () =>
    {
        let tempDir: TempDirectory;
        let fileName: string;
        let compiler: EmojiInstructionCompiler;

        suiteSetup(
            () =>
            {
                tempDir = new TempDirectory();

                let $package: Package = new Package(
                    {
                        Identifier: "test",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let instruction: EmojiInstruction = new EmojiInstruction(
                    {
                        FileName: "emojis.xml",
                        Emojis: []
                    });

                $package.InstallSet.push(instruction);
                compiler = new EmojiInstructionCompiler(instruction);
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