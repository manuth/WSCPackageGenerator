import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as tar from "tar";
import { FileInstructionCompiler } from "../../../System/Compilation/FileInstructionCompiler";
import { TempDirectory } from "../../../System/FileSystem/TempDirectory";
import { ApplicationFileSystemInstruction } from "../../../System/PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { Package } from "../../../System/PackageSystem/Package";

suite(
    "FileInstructionCompiler",
    () =>
    {
        let sourceDir: TempDirectory;
        let testDir: TempDirectory;
        let packageDir: TempDirectory;
        let archiveFileName: string;
        let instruction: ApplicationFileSystemInstruction;
        let compiler: FileInstructionCompiler;
        let fileNames: string[];
        let content: string;

        suiteSetup(
            async () =>
            {
                sourceDir = new TempDirectory();
                testDir = new TempDirectory();
                packageDir = new TempDirectory();
                fileNames = [
                    "test1.txt",
                    "test2.txt",
                    "this-is-a-file.txt",
                    ".htaccess",
                    "blargh.xcf"];
                content = "Hello World";

                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                for (let fileName of fileNames)
                {
                    await FileSystem.writeFile(sourceDir.MakePath(fileName), content);
                }

                instruction = new ApplicationFileSystemInstruction(
                    {
                        Source: sourceDir.FileName
                    });

                $package.InstallSet.push(instruction);
                compiler = new FileInstructionCompiler(instruction);
                compiler.DestinationPath = packageDir.FileName;
                archiveFileName = compiler.DestinationFileName;
            });

        suiteTeardown(
            () =>
            {
                sourceDir.Dispose();
                testDir.Dispose();
            });

        test(
            "Checking whether the instruction can be compiled...",
            async () =>
            {
                await compiler.Execute();
            });

        test(
            "Checking whether the archive has been created...",
            async () =>
            {
                assert.strictEqual(await FileSystem.pathExists(archiveFileName), true);
            });

        test(
            "Checking whether the archive can be extracted...",
            async () =>
            {
                await tar.extract(
                    {
                        cwd: testDir.FileName,
                        file: archiveFileName
                    });
            });

        test(
            "Checking whether all files are present inside the archive...",
            async () =>
            {
                let files: string[] = [];

                await tar.list({
                    file: archiveFileName,
                    onentry: (entry: tar.FileStat): void =>
                    {
                        files.push(entry.header.path);
                    },
                    filter: (fileName: string, stat: tar.FileStat): boolean =>
                    {
                        return Path.parse(fileName).dir.length === 0;
                    }
                });

                assert.strictEqual(fileNames.every((fileName: string): boolean => files.includes(fileName)), true);
                assert.strictEqual(files.every((fileName: string): boolean => fileNames.includes(fileName)), true);
            });
    });