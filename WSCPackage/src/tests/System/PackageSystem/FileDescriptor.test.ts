import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { TempDirectory, TempFile } from "temp-filesystem";
import { FileDescriptor } from "../../../System/PackageSystem/FileDescriptor";

suite(
    "FileDescriptor",
    () =>
    {
        let workingDir: TempDirectory;
        let currentDir: string;
        let fileName: string;
        let fileDescriptor: FileDescriptor;
        let content: string;

        suiteSetup(
            () =>
            {
                workingDir = new TempDirectory();
                currentDir = process.cwd();
                process.chdir(workingDir.FullName);
                content = "Hello World";
            });

        suiteTeardown(
            () =>
            {
                process.chdir(currentDir);
                workingDir.Dispose();
            });

        setup(
            async () =>
            {
                await FileSystem.ensureFile(fileName);
                await FileSystem.writeFile(fileName, content);
                fileDescriptor = new FileDescriptor({
                    Source: fileName
                });
            });

        suite(
            "Checking whether absolute paths are handled correctly...",
            () =>
            {
                let tempFile: TempFile;

                suiteSetup(
                    () =>
                    {
                        tempFile = new TempFile();
                        fileName = tempFile.FullName;
                    });

                suiteTeardown(
                    () =>
                    {
                        tempFile.Dispose();
                    });

                test(
                    "Checking whether the `Source` points to the correct file...",
                    async () =>
                    {
                        assert.strictEqual((await FileSystem.readFile(fileDescriptor.Source)).toString(), content);
                    });

                test(
                    "Checking whether the `FileName` automatically is set to the basename of the source if no filename is specified...",
                    () =>
                    {
                        assert.strictEqual(fileDescriptor.FileName, Path.basename(fileName));
                    });
            });

        suite(
            "Checking whether relative paths are handled correctly...",
            () =>
            {
                let relativeFile: string;

                suiteSetup(
                    () =>
                    {
                        relativeFile = "./foo/bar/baz/test.txt";
                        fileName = relativeFile;
                        content = "Hello Relative World";
                    });

                test(
                    "Checking whether `Source` points to the correct file...",
                    async () =>
                    {
                        assert.strictEqual((await FileSystem.readFile(fileDescriptor.Source)).toString(), content);
                    });

                test(
                    "Checking whether `Source` points to the correct file even if the working directory is changed...",
                    async () =>
                    {
                        let tempDir: TempDirectory = new TempDirectory();
                        let current: string = process.cwd();
                        process.chdir(tempDir.FullName);
                        {
                            assert.strictEqual((await FileSystem.readFile(fileDescriptor.Source)).toString(), content);
                        }
                        process.chdir(current);
                    });

                test(
                    "Checking whether `FileName` is set to the relative path if no filename is specified...",
                    () =>
                    {
                        assert.strictEqual(fileDescriptor.FileName, Path.normalize(fileName));
                    });
            });

        suite(
            "Checking whether relative paths outside of the current directory are handled correctly...",
            () =>
            {
                let current: string;
                let childDir: string;
                let relativeFile: string;

                suiteSetup(
                    async () =>
                    {
                        current = process.cwd();
                        childDir = "foo";
                        relativeFile = "../bar/baz/test.txt";
                        fileName = relativeFile;
                        content = "Hello Parent World";
                        await FileSystem.ensureDir(childDir);
                        process.chdir(childDir);
                    });

                suiteTeardown(
                    () =>
                    {
                        process.chdir(current);
                    });

                test(
                    "Checking whether `Source` points to the correct file...",
                    async () =>
                    {
                        assert.strictEqual((await FileSystem.readFile(fileDescriptor.Source)).toString(), content);
                    });

                test(
                    "Checking whether `FileName` is set to the basename of the path if no filename is specified...",
                    () =>
                    {
                        assert.strictEqual(fileDescriptor.FileName, Path.basename(fileName));
                    });
            });
    });