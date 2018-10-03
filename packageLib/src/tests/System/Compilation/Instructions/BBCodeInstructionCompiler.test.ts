import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
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
        let instruction: BBCodeInstruction;
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

                translationDir = "bbCodeLanguageStuff";
                packageDir = new TempDirectory();
                locales = ["en"];

                for (let locale of locales)
                {
                    displayName[locale] = "test";
                }

                instruction = new BBCodeInstruction(
                    {
                        FileName: "bbCodes.xml",
                        BBCodes: [
                            {
                                Name: "bar",
                                DisplayName: displayName
                            }
                        ],
                        TranslationDirectory: translationDir
                    });

                $package.InstallSet.push(instruction);
                compiler = new BBCodeInstructionCompiler(instruction);
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
                        let files: string[] = await FileSystem.readdir(Path.join(packageDir.FileName, instruction.DestinationRoot, translationDir));
                        assert.strictEqual(locales.every((locale: string) => files.includes(`${locale}.xml`)), true);
                    });
            });
    });