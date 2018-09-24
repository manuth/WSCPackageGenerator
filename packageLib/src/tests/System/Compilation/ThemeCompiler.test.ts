import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { ThemeCompiler } from "../../../System/Compilation/ThemeCompiler";
import { TempDirectory } from "../../../System/FileSystem/TempDirectory";
import { TempFile } from "../../../System/FileSystem/TempFile";
import { ThemeInstruction } from "../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../System/PackageSystem/Package";

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

                await FileSystem.writeJson(
                    variableFile.FileName,
                    {
                        wcfHeaderBackground: "red"
                    });

                let instruction: ThemeInstruction = new ThemeInstruction(
                    {
                        Theme: {
                            Name: "foo",
                            DisplayName: {},
                            VariableFileName: variableFile.FileName
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
                compiler.DestinationPath = tempDir.FileName;
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
                    "Checking whether themes can be compild without an error...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the style-metadata exists...",
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