import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as tar from "tar";
import { TempDirectory, TempFile } from "temp-filesystem";
import { Compiler } from "../../../System/Compilation/Compiler";

suite(
    "Compiler",
    () =>
    {
        let tempDir: TempDirectory;
        let compiler: Compiler<{}>;

        suiteSetup(
            () =>
            {
                tempDir = new TempDirectory();

                compiler = new class extends Compiler<{}>
                {
                    protected async Compile(): Promise<void>
                    {
                    }
                }({});

                compiler.DestinationPath = tempDir.FullName;
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
            });

        suite(
            "CopyTemplate()",
            () =>
            {
                let ejsString: string;
                let context: { [key: string]: string };
                let result: string;

                suiteSetup(
                    () =>
                    {
                        ejsString = "<%= Hello %> World";
                        context = { Hello: "Good Morning" };
                        result = "Good Morning World";
                    });

                suite(
                    "Copying files...",
                    () =>
                    {
                        let sourceFile: TempFile;
                        let destinationFile: TempFile;

                        setup(
                            () =>
                            {
                                sourceFile = new TempFile();
                                destinationFile = new TempFile();
                            });

                        teardown(
                            () =>
                            {
                                sourceFile.Dispose();
                                destinationFile.Dispose();
                            });

                        test(
                            "Checking whether ejs-strings are replaced when copying the file to a new location...",
                            async () =>
                            {
                                await FileSystem.writeFile(sourceFile.FullName, ejsString);
                                await compiler["CopyTemplate"](sourceFile.FullName, destinationFile.FullName, context);
                                assert.strictEqual((await FileSystem.readFile(destinationFile.FullName)).toString(), result);
                            });

                        test(
                            "Checking whether ejs-strings are replaced when overwriting the source-file...",
                            async () =>
                            {
                                await FileSystem.writeFile(sourceFile.FullName, ejsString);
                                await compiler["CopyTemplate"](sourceFile.FullName, sourceFile.FullName, context);
                                assert.strictEqual((await FileSystem.readFile(sourceFile.FullName)).toString(), result);
                            });
                    });

                suite(
                    "Copying directories...",
                    () =>
                    {
                        let sourceDir: TempDirectory;
                        let destinationDir: TempDirectory;
                        let fileName: string;
                        let hiddenFileName: string;

                        suiteSetup(
                            () =>
                            {
                                fileName = "test.txt";
                                hiddenFileName = ".htaccess";
                            });

                        setup(
                            () =>
                            {
                                sourceDir = new TempDirectory();
                                destinationDir = new TempDirectory();
                            });

                        teardown(
                            () =>
                            {
                                sourceDir.Dispose();
                                destinationDir.Dispose();
                            });

                        test(
                            "Checking whether normal files are copied correctly...",
                            async () =>
                            {
                                await FileSystem.writeFile(sourceDir.MakePath(fileName), ejsString);
                                await compiler["CopyTemplate"](sourceDir.FullName, destinationDir.FullName, context);
                                assert.strictEqual((await FileSystem.readFile(destinationDir.MakePath(fileName))).toString(), result);
                            });

                        test(
                            "Checking whether hidden files are copied correctly...",
                            async () =>
                            {
                                await FileSystem.writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                await compiler["CopyTemplate"](sourceDir.FullName, destinationDir.FullName, context);
                                assert.strictEqual((await FileSystem.readFile(destinationDir.MakePath(hiddenFileName))).toString(), result);
                            });

                        test(
                            "Checking whether variables are replaced correctly when overwriting the source-files...",
                            async () =>
                            {
                                await FileSystem.writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                await compiler["CopyTemplate"](sourceDir.FullName, sourceDir.FullName, context);
                                assert.strictEqual((await FileSystem.readFile(sourceDir.MakePath(hiddenFileName))).toString(), result);
                            });
                    });
            });

        suite(
            "MakeDestinationPath(...path)",
            () =>
            {
                let path: string[];

                suiteSetup(
                    () =>
                    {
                        path = ["foo", "bar", "baz"];
                    });

                test(
                    "Checking whether destination-paths are built correctly...",
                    () =>
                    {
                        assert.strictEqual(Path.join(compiler.DestinationPath, ...path), compiler["MakeDestinationPath"](...path));
                    });
            });

        suite(
            "Compress(source, destination)",
            async () =>
            {
                let files: string[];
                let sourceDir: TempDirectory;
                let destinationFile: TempFile;

                suiteSetup(
                    () =>
                    {
                        files = ["foo", "bar", "baz", ".htaccess"];
                    });

                setup(
                    async () =>
                    {
                        sourceDir = new TempDirectory();
                        destinationFile = new TempFile();

                        for (let file of files)
                        {
                            await FileSystem.writeFile(sourceDir.MakePath(file), "this is a test");
                        }
                    });

                teardown(
                    () =>
                    {
                        sourceDir.Dispose();
                        destinationFile.Dispose();
                    });

                test(
                    "Checking whether files are compressed correctly...",
                    async () =>
                    {
                        let testDir: TempDirectory = new TempDirectory();
                        {
                            await compiler["Compress"](sourceDir.FullName, destinationFile.FullName);
                            await tar.extract(
                                {
                                    cwd: testDir.FullName,
                                    file: destinationFile.FullName
                                });

                            let archiveFiles: string[] = await FileSystem.readdir(testDir.FullName);
                            assert.strictEqual(files.every((file: string) => archiveFiles.includes(file)), true);
                        }
                        testDir.Dispose();
                    });
            });
    });