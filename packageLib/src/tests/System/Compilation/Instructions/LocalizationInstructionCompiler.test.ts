import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { LocalizationInstructionCompiler } from "../../../../System/Compilation/Instructions/LocalizationInstructionCompiler";
import { TempDirectory } from "../../../../System/FileSystem/TempDirectory";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { TranslationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/TranslationInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "LocalizationInstructionCompiler",
    () =>
    {
        let locales: string[];
        let packageDir: TempDirectory;
        let compiler: LocalizationInstructionCompiler;
        let fileName: string;

        suiteSetup(
            () =>
            {
                let localization: ILocalization = {};
                locales = ["en", "it", "fr"];
                packageDir = new TempDirectory();

                for (let locale of locales)
                {
                    localization[locale] = "example";
                }

                let $package: Package = new Package(
                    {
                        Identifier: "test",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let instruction: TranslationInstruction = new TranslationInstruction(
                    {
                        FileName: "language",
                        Nodes: [
                            {
                                Name: "foo",
                                Item: {
                                    Translations: localization
                                }
                            }
                        ]
                    });

                $package.InstallSet.push(instruction);
                compiler = new LocalizationInstructionCompiler(instruction);
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
                    "Checking whether the item can be compiled...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether all the expected files exist...",
                    async () =>
                    {
                        let files: string[] = await FileSystem.readdir(fileName);

                        assert.strictEqual(
                            files.every(
                                (file: string) =>
                                {
                                    return locales.includes(Path.parse(file).name);
                                }),
                                true);

                        assert.strictEqual(
                            locales.every(
                                (locale: string) =>
                                {
                                    return files.includes(`${locale}.xml`);
                                }),
                                true);
                    });
            });
    });