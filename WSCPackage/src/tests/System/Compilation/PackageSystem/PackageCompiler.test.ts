import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as tar from "tar";
import { TempDirectory, TempFile } from "temp-filesystem";
import { PackageCompiler } from "../../../../System/Compilation/PackageSystem/PackageCompiler";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "PackageCompiler",
    () =>
    {
        let archive: TempFile;
        let archiveDir: TempDirectory;
        let compiler: PackageCompiler;
        let $package: Package;

        suiteSetup(
            () =>
            {
                archive = new TempFile();
                archiveDir = new TempDirectory();
                $package = new Package(
                    {
                        Identifier: "com.example.mypackage",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                compiler = new PackageCompiler($package);
                compiler.DestinationPath = archive.FullName;
            });

        suiteTeardown(
            () =>
            {
                archive.Dispose();
                archiveDir.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the instruction can be executed...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the tar-archive can be extracted...",
                    async () =>
                    {
                        await tar.extract(
                            {
                                cwd: archiveDir.FullName,
                                file: archive.FullName
                            });
                    });

                test(
                    "Checking whether the package-manifest exists inside the tar-archive...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(archiveDir.MakePath("package.xml")), true);
                    });
            });
    });