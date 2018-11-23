import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { GroupOptionInstructionCompiler } from "../../../../System/Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { GroupOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/GroupOptionInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "ACPOptionInstructionCompiler",
    () =>
    {
        let fileName: string;
        let translationDir: string;
        let tempDir: TempDirectory;
        let compiler: GroupOptionInstructionCompiler;
        let locales: string[];

        suiteSetup(
            () =>
            {
                let displayName: ILocalization = {};
                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                tempDir = new TempDirectory();
                locales = ["en", "cn", "es"];

                for (let locale of locales)
                {
                    displayName[locale] = "test";
                }

                let instruction: GroupOptionInstruction = new GroupOptionInstruction(
                    {
                        FileName: "options.xml",
                        Nodes: [
                            {
                                Name: "bar",
                                Item: {
                                    DisplayName: displayName
                                }
                            }
                        ]
                    });

                $package.InstallSet.push(instruction);
                compiler = new GroupOptionInstructionCompiler(instruction);
                compiler.DestinationPath = tempDir.FullName;
                fileName = compiler.DestinationFileName;
                translationDir = tempDir.MakePath(instruction.DestinationRoot, instruction.TranslationDirectory);
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
                    "Checking whether the compiler can be executed...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the option-file exists...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(fileName), true);
                    });

                test(
                    "Checking whether the language-files exist...",
                    async () =>
                    {
                        let files: string[] = await FileSystem.readdir(translationDir);
                        assert.strictEqual(locales.every((locale: string) => files.includes(`${locale}.xml`)), true);
                    });
            });
    });