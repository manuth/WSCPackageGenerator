import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { ACPOptionInstructionCompiler } from "../../../../System/Compilation/Instructions/ACPOptionInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/ACPOptionInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "ACPOptionInstructionCompiler",
    () =>
    {
        let fileName: string;
        let translationDir: string;
        let packageDir: TempDirectory;
        let compiler: ACPOptionInstructionCompiler;
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

                packageDir = new TempDirectory();
                locales = ["en", "de", "it", "fr"];

                for (let locale of locales)
                {
                    displayName[locale] = "test";
                }

                let instruction: ACPOptionInstruction = new ACPOptionInstruction(
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
                compiler = new ACPOptionInstructionCompiler(instruction);
                compiler.DestinationPath = packageDir.FileName;
                fileName = compiler.DestinationFileName;
                translationDir = packageDir.MakePath(instruction.DestinationRoot, instruction.TranslationDirectory);
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