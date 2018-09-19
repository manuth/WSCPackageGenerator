import * as assert from "assert";
import * as clearRequire from "clear-require";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { ImageDirectoryDescriptor } from "../System/Customization/Presentation/Themes/ImageDirectoryDescriptor";
import { SassVariableParser } from "../System/Customization/Presentation/Themes/SassVariableParser";
import { TempDirectory } from "../System/FileSystem/TempDirectory";
import { ModuleInfo } from "../System/PackageSystem/ModuleInfo";
import { Person } from "../System/PackageSystem/Person";

suite("WoltLab Suite Core Package Library", () =>
{
    suite(
        "System",
        () =>
        {
            suite(
                "FileSystem",
                () =>
                {
                    suite(
                        "TempDirectory",
                        () =>
                        {
                            let tempDir: TempDirectory;
                            let tempDirName: string;
                            let tempFileName: string;

                            suiteSetup(
                                () =>
                                {
                                    tempDir = new TempDirectory();
                                    tempDirName = tempDir.FileName;
                                    tempFileName = "test.txt";
                                });

                            test(
                                "Checking whether the temporary directory exists...",
                                () => assert.strictEqual(FileSystem.pathExistsSync(tempDirName), true));

                            test(
                                "Checking whether files can be written to the temporary directory...",
                                () => FileSystem.writeFileSync(tempDir.MakePath(tempFileName), "test"));

                            test(
                                "Checking whether the file written to the temporary directory exists...",
                                () => assert.strictEqual(FileSystem.existsSync(Path.join(tempDirName, tempFileName)), true));

                            test(
                                "Checking whether the `TempDirectory`-object can be disposed...",
                                () => assert.doesNotThrow(() => tempDir.Dispose()));

                            test(
                                "Checking whether the temporary directory has been deleted...",
                                () =>
                                {
                                    assert.strictEqual(FileSystem.pathExistsSync(tempDirName), false);
                                });
                        });
                });

            suite(
                "PackageSystem",
                () =>
                {
                    suite(
                        "ModuleInfo",
                        () =>
                        {
                            let name: string;
                            let version: string;
                            let license: string;
                            let author: Person;
                            let packageFileName: string;
                            let moduleInfo: ModuleInfo;

                            suiteSetup(
                                async () =>
                                {
                                    name = "example";
                                    version = "2.0.1";
                                    license = "Apache-2.0";

                                    author = new Person(
                                        {
                                            Name: "John Doe",
                                            URL: "https://example.com/"
                                        });

                                    packageFileName = Path.join(__dirname, "..", "..", "package.json");
                                });

                            suite(
                                "Testing whether the values are read correctly...",
                                () =>
                                {
                                    setup(
                                        () =>
                                        {
                                            clearRequire(packageFileName);
                                        });

                                    test(
                                        "Checking whether the author inside the `package.json`-file with author set to a string can be read...",
                                        async () =>
                                        {
                                            await FileSystem.writeJson(
                                                packageFileName,
                                                {
                                                    author: author.Name
                                                });

                                            moduleInfo = new ModuleInfo();
                                            assert.strictEqual(moduleInfo.Author.Name, author.Name);
                                            assert.equal(moduleInfo.Author.URL, null);
                                        });

                                    test(
                                        "Checking whether the author inside the `package.json`-file with author set to an object can be read...",
                                        async () =>
                                        {
                                            await FileSystem.writeJson(
                                                packageFileName,
                                                {
                                                    author: {
                                                        name: author.Name,
                                                        url: author.URL
                                                    }
                                                });

                                            moduleInfo = new ModuleInfo();
                                            assert.strictEqual(moduleInfo.Author.Name, author.Name);
                                            assert.strictEqual(moduleInfo.Author.URL, author.URL);
                                        });

                                    test(
                                        "Checking whether all the other values of the `packaghe.json`-file are read correctly...",
                                        async () =>
                                        {
                                            await FileSystem.writeJson(
                                                packageFileName,
                                                {
                                                    name,
                                                    version,
                                                    license,
                                                    author: {
                                                        name: author.Name,
                                                        url: author.URL
                                                    }
                                                });

                                            moduleInfo = new ModuleInfo();
                                            assert.strictEqual(moduleInfo.Name, name);
                                            assert.strictEqual(moduleInfo.Version, version);
                                            assert.strictEqual(moduleInfo.License, license);
                                        });
                                });

                            suiteTeardown(
                                async () =>
                                {
                                    await FileSystem.unlink(packageFileName);
                                });
                        });
                });

            suite(
                "Themes",
                () =>
                {
                    suite(
                        "SassVariableParser",
                        () =>
                        {
                            let mainFile: string;
                            let importFile: string;
                            let tempDir: TempDirectory;

                            let var1Name: string;
                            let var1Value: string;
                            let var2Name: string;
                            let var2Value: string;
                            let var3Name: string;

                            let variablesWithoutImport: { [key: string]: string };
                            let variablesWithImport: { [key: string]: string };

                            suiteSetup(
                                async () =>
                                {
                                    mainFile = "main.scss";
                                    importFile = "import.scss";
                                    tempDir = new TempDirectory();

                                    var1Name = "a";
                                    var1Value = "#000";
                                    var2Name = "b";
                                    var2Value = '"Hello World"';

                                    await FileSystem.writeFile(tempDir.MakePath(mainFile), `$${var1Name}: ${var1Value};`);
                                    await FileSystem.writeFile(
                                        tempDir.MakePath(importFile),
                                        dedent(
                                            `
                                            @import "${Path.basename(mainFile)}";
                                            $${var2Name}: ${var2Value};
                                            $${var3Name}: $${var1Name};`
                                        ));

                                    variablesWithoutImport = new SassVariableParser(tempDir.MakePath(mainFile)).Parse();
                                    variablesWithImport = new SassVariableParser(tempDir.MakePath(importFile)).Parse();
                                });

                            suite(
                                "Testing scss-files without import-statements...",
                                () =>
                                {
                                    test(
                                        "Checking whether expected variable is present...",
                                        () => assert.strictEqual(var1Name in variablesWithoutImport, true));

                                    test(
                                        "Checking whether the value of the expected variable is correct...",
                                        () => assert.strictEqual(variablesWithoutImport[var1Name], var1Value));
                                });

                            suite(
                                "Testing scss-files with import-statements...",
                                () =>
                                {
                                    test(
                                        "Checking whether the expected variables are present...",
                                        () =>
                                        {
                                            assert.strictEqual(var2Name in variablesWithImport, true);
                                            assert.strictEqual(var3Name in variablesWithImport, true);
                                        });

                                    test(
                                        "Checking whether variables imported variables are not present...",
                                        () =>
                                        {
                                            assert.strictEqual(var1Name in variablesWithImport, false);
                                        });

                                    test(
                                        "Checking whether independent variables have the correct value...",
                                        () =>
                                        {
                                            assert.strictEqual(variablesWithImport[var2Name], var2Value);
                                        });

                                    test(
                                        "Checking whether variables which depend on imports have the correct value...",
                                        () =>
                                        {
                                            assert.strictEqual(variablesWithImport[var3Name], var1Value);
                                        });
                                });

                            suiteTeardown(
                                () =>
                                {
                                    tempDir.Dispose();
                                });
                        });

                    suite(
                        "ImageDirectoryDescriptor",
                        () =>
                        {
                            let customFileName: string;
                            let customDestination: string;

                            let imageDirectory: ImageDirectoryDescriptor;

                            let customImageDirectory: ImageDirectoryDescriptor;

                            suiteSetup(
                                () =>
                                {
                                    customFileName = "example.tar";
                                    customDestination = "dist";

                                    imageDirectory = new ImageDirectoryDescriptor(
                                        {
                                            Source: "example"
                                        });

                                    customImageDirectory = new ImageDirectoryDescriptor(
                                        {
                                            Source: "example",
                                            FileName: customFileName,
                                            DestinationRoot: customDestination
                                        });
                                });

                            suite(
                                "FileName",
                                () =>
                                {
                                    test(
                                        'Checking whether the `FileName`-property is set to "images.tar" when no filename is specified...',
                                        () => assert.strictEqual(imageDirectory.FileName, "images.tar"));

                                    test(
                                        "Checking whether the `FileName`-property is set properly when a filename is specified...",
                                        () => assert.strictEqual(customImageDirectory.FileName, customFileName));
                                });

                            suite(
                                "DestinationRoot",
                                () =>
                                {
                                    test(
                                        "Checking whether `DestinationRoot` is set to `Source` when no destination-root is specified...",
                                        () => assert.strictEqual(imageDirectory.DestinationRoot, imageDirectory.Source));

                                    test(
                                        "Checking whether `DestinationRoot` is set properly when a destination-root is specified...",
                                        () => assert.strictEqual(customImageDirectory.DestinationRoot, customDestination));
                                });
                        });
                });
        });
});