import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { BBCodeInstructionCompiler } from "../../../../System/Compilation/Instructions/BBCodeInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { BBCodeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/BBCodeInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "BBCodeInstructionCompiler",
    () =>
    {
        let fileName: string;
        let translationDir: string;
        let packageDir: TempDirectory;
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

                packageDir = new TempDirectory();
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