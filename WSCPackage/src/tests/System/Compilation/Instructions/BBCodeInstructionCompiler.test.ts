import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { BBCodeInstructionCompiler } from "../../../../System/Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { BBCodeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/BBCodeInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "BBCodeInstructionCompiler",
    () =>
    {
        let fileName: string;
        let translationDir: string;
        let tempDir: TempDirectory;
        let compiler: BBCodeInstructionCompiler;
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
                locales = ["en"];

                for (let locale of locales)
                {
                    displayName[locale] = "test";
                }

                let instruction: BBCodeInstruction = new BBCodeInstruction(
                    {
                        FileName: "bbCodes.xml",
                        BBCodes: [
                            {
                                Name: "bar",
                                DisplayName: displayName
                            }
                        ],
                        TranslationDirectory: "bbCodeLanguageStuff"
                    });

                $package.InstallSet.push(instruction);
                compiler = new BBCodeInstructionCompiler(instruction);
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
                    "Checking whether the bb-code file exists...",
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