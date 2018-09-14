import * as assert from "assert";
import * as Dedent from "dedent";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { TempDirectory } from "../Core/FileSystem/TempDirectory";
import { ThemeInstruction } from "../PackageSystem/Instructions/Customization/ThemeInstruction";
import { SQLInstruction } from "../PackageSystem/Instructions/Data/SQLInstruction";
import { ApplicationFileSystemInstruction } from "../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { Instruction } from "../PackageSystem/Instructions/Instruction";
import { Package } from "../PackageSystem/Package";

suite("WoltLab Suite Core Package Library", () =>
{
    let $package: Package;

    suiteSetup(
        () =>
        {
            $package = new Package({
                DisplayName: { inv: "Test" },
                Identifier: "test",
                InstallSet: {
                    Instructions: [
                    ]
                }
            });
        });

    suite(
        "Instruction",
        () =>
        {
            let instruction: Instruction;

            suiteSetup(
                () =>
                {
                    instruction = new SQLInstruction({ Source: "main.sql" });
                    $package.InstallSet.push(instruction);
                });

            suite(
                "Type",
                () =>
                {
                    test(
                        "Testing whether type equals the expected value...",
                        () =>
                        {
                            assert.strictEqual(instruction.Type, "sql");
                        });
                });

            suite(
                "XML",
                () =>
                {
                    suite(
                        "Testing whether the XML-code is built correctly... ",
                        () =>
                        {
                            let xml: Document;

                            suiteSetup(
                                () =>
                                {
                                    xml = new DOMParser().parseFromString(instruction.XML);
                                });

                            test(
                                "Testing whether the root-tag has the correct name...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.tagName, "instruction");
                                });

                            test(
                                "Testing whether the `type`-attribute is present...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.hasAttribute("type"), true);
                                });

                            test(
                                "Testing whether the `type`-attribute equals the `Type`-member of the instruction...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.getAttribute("type"), instruction.Type);
                                });

                            test(
                                "Testing whether the text of the tag equals the filename of the instruction...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.textContent, instruction.FullName);
                                });
                        });
                });
        });

    suite(
        "FileSystemInstruction",
        () =>
        {
            suite(
                "FileName",
                () =>
                {
                    let sqlInstruction: SQLInstruction;
                    let sqlInstructionWithFileName: SQLInstruction;

                    suiteSetup(
                        () =>
                        {
                            sqlInstruction = new SQLInstruction({ Source: "main.sql" });
                            sqlInstructionWithFileName = new SQLInstruction({ FileName: "sql/script.sql", Source: "main.sql" });
                        });

                    test(
                        "Testing whether `FileName` equals `Source` when the `FileName` isn't specified...",
                        () =>
                        {
                            assert.strictEqual(sqlInstruction.FileName, sqlInstruction.Source);
                        });

                    test(
                        "Testing whether `Source` doesn't affect `FileName` when the `FileName` is specified...",
                        () =>
                        {
                            assert.notEqual(sqlInstructionWithFileName.FileName, sqlInstructionWithFileName.Source);
                        });
                });
        });

    suite(
        "SQLInstruction",
        () =>
        {
        });

    suite(
        "ThemeInstruction",
        () =>
        {
            let themeInstruction: ThemeInstruction;
            let tempDir: TempDirectory;

            suiteSetup(
                async () =>
                {
                    // Creating test-files...
                    tempDir = new TempDirectory();
                    let customScssFileName: string = tempDir.MakePath("custom.scss");
                    let scssOverrideFileName: string = tempDir.MakePath("override.scss");
                    let variableFileName: string = tempDir.MakePath("variables.json");

                    await FileSystem.writeFile(
                        customScssFileName,
                        Dedent(
                            `
                                :root
                                {
                                    color: red !important;
                                }
                            `));

                    await FileSystem.writeFile(
                        scssOverrideFileName,
                        Dedent(
                            `
                                $wcfHeaderBackground: blue;
                                $wcfFontLineHeight: 1.4;
                            `));

                    await FileSystem.writeJSON(
                        variableFileName,
                        {
                            pageLogoWidth: 450,
                            pageLogoHeight: 55
                        });

                    themeInstruction = new ThemeInstruction({
                        Theme: {
                            Name: "Ugly Theme",
                            DisplayName: {
                                inv: "Ugly Theme"
                            },
                            CustomScssFileName: customScssFileName,
                            ScssOverrideFileName: scssOverrideFileName,
                            VariableFileName: variableFileName
                        }
                    });
                });

            suite(
                "Theme",
                () =>
                {
                    test(
                        "Testing whether the `Theme`-property is set...",
                        () =>
                        {
                            assert.notEqual(themeInstruction.Theme, null);
                        });
                });

            suite(
                "FileName",
                () =>
                {
                     test(
                        "Testing whether the `FileName`-property is set automatically according to the name of the theme...",
                        () =>
                        {
                            assert.strictEqual(themeInstruction.FileName, `${themeInstruction.Theme.Name}.tar`);
                        });
                });

            suiteTeardown(
                async () =>
                {
                    await FileSystem.emptyDir(tempDir.FileName);
                    tempDir.Dispose();
                });
        });

    suite(
        "ApplicationFileSystemInstruction",
        () =>
        {
            let instruction: ApplicationFileSystemInstruction;

            suiteSetup(
                () =>
                {
                    instruction = new ApplicationFileSystemInstruction({ Source: "files/gallery", Application: "gallery" });
                });

            test(
                "Testing whether the application is set correctly...",
                () =>
                {
                    assert.strictEqual(instruction.Application, "gallery");
                });

            test(
                "Testing whether the `FileName` is generated correctly if no `FileName` is specified...",
                () =>
                {
                    assert.strictEqual(instruction.FileName, `${instruction.Source}.tar`);
                });
        });
});