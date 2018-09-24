import * as assert from "assert";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as tar from "tar";
import { ThemeInstructionCompiler } from "../../../System/Compilation/ThemeInstructionCompiler";
import { TempDirectory } from "../../../System/FileSystem/TempDirectory";
import { ThemeInstruction } from "../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../System/PackageSystem/Package";

suite(
    "ThemeInstructionCompiler",
    () =>
    {
        let themeArchive: string;
        let packageDir: TempDirectory;
        let themeDir: TempDirectory;
        let compiler: ThemeInstructionCompiler;
        let instruction: ThemeInstruction;

        suiteSetup(
            async () =>
            {
                packageDir = new TempDirectory();
                themeDir = new TempDirectory();

                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let tempDir: TempDirectory = new TempDirectory();
                await FileSystem.writeFile(
                    tempDir.MakePath("variables.json"),
                    dedent(`
                        {
                            "wcfHeaderBackground": "red",
                            "somethingSpecial": "blarghhacks",
                            "moreSpecialStuff": "foobar"
                        }`));
                await FileSystem.writeFile(
                    tempDir.MakePath("main.scss"),
                    dedent(`
                        :root
                        {
                            color: red !important;
                        }`));

                instruction = new ThemeInstruction(
                    {
                        Theme: {
                            Name: "blargh",
                            DisplayName: {},
                            VariableFileName: tempDir.MakePath("variables.json"),
                            CustomScssFileName: tempDir.MakePath("main.scss")
                        }
                    });

                tempDir.Dispose();
                $package.InstallSet.push(instruction);
                compiler = new ThemeInstructionCompiler(instruction);
                compiler.DestinationPath = packageDir.FileName;
                themeArchive = packageDir.MakePath(instruction.FullName);
            });

        suiteTeardown(
            () =>
            {
                packageDir.Dispose();
                themeDir.Dispose();
            });

        test(
            "Checking whether the instruction can be compiled without any errors...",
            async () =>
            {
                await compiler.Execute();
            });

        test(
            "Checking whether the tar-archive has been created...",
            async () =>
            {
                assert.strictEqual(await FileSystem.pathExists(themeArchive), true);
            });

        test(
            "Checking whether the tar-archive can be extracted without an error...",
            async () =>
            {
                await tar.extract(
                    {
                        cwd: themeDir.FileName,
                        file: themeArchive
                    });
            });

        test(
            "Checking whether the files expected in the tar-archive exist...",
            async () =>
            {
                assert.strictEqual(await FileSystem.pathExists(Path.join(themeDir.FileName, "style.xml")), true);
            });
    });