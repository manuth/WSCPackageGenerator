import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempDirectory, TempFile } from "temp-filesystem";
import { ThemeCompiler } from "../../../../System/Compilation/Presentation/ThemeCompiler";
import { ThemeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "ThemeCompiler",
    () =>
    {
        let tempDir: TempDirectory;
        let variableFile: TempFile;
        let variableFileName: string;
        let compiler: ThemeCompiler;

        suiteSetup(
            async () =>
            {
                tempDir = new TempDirectory();
                variableFile = new TempFile(
                    {
                        postfix: ".json"
                    });

                variableFileName = "myVariableFile.xml";

                await FileSystem.writeJSON(
                    variableFile.FullName,
                    {
                        wcfHeaderBackground: "red"
                    });

                let instruction: ThemeInstruction = new ThemeInstruction(
                    {
                        Theme: {
                            Name: "foo",
                            DisplayName: {},
                            VariableFileName: variableFile.FullName
                        }
                    });

                let $package: Package = new Package(
                    {
                        Identifier: "bar",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                $package.InstallSet.push(instruction);
                compiler = new ThemeCompiler(instruction.Theme, variableFileName);
                compiler.DestinationPath = tempDir.FullName;
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
                variableFile.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether themes can be compiled without an error...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the theme-metadata exists...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(tempDir.MakePath("style.xml")), true);
                    });

                test(
                    "Checking whether the variable-file exists...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(tempDir.MakePath(variableFileName)), true);
                    });
            });
    });