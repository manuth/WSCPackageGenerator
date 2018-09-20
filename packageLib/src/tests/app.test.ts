import * as assert from "assert";
import * as clearRequire from "clear-require";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import * as OS from "os";
import * as Path from "path";
import { ImageDirectoryDescriptor } from "../System/Customization/Presentation/Themes/ImageDirectoryDescriptor";
import { SassVariableParser } from "../System/Customization/Presentation/Themes/SassVariableParser";
import { Theme } from "../System/Customization/Presentation/Themes/Theme";
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

                    suite(
                        "Theme",
                        () =>
                        {
                            interface IVariable
                            {
                                Name: string;
                                Input: string;
                                Output: string;
                                Special?: boolean;
                                Source: "scss" | "json";
                            }

                            let theme: Theme;
                            let tempDir: TempDirectory;
                            let customScss: string;
                            let variables: IVariable[] = [
                                {
                                    Name: "wcfHeaderBackground",
                                    Input: "#056",
                                    Output: "rgba(0, 85, 102, 1)",
                                    Source: "scss"
                                },
                                {
                                    Name: "wcfHeaderText",
                                    Input: "#056C",
                                    Output: "rgba(0, 85, 102, 0.8)",
                                    Source: "json"
                                },
                                {
                                    Name: "wcfHeaderLinkActive",
                                    Input: "#056CA5",
                                    Output: "rgba(5, 108, 165, 1)",
                                    Source: "json"
                                },
                                {
                                    Name: "wcfHeaderSearchBoxBackground",
                                    Input: "#056CA5C7",
                                    Output: "rgba(5, 108, 165, 0.78)",
                                    Source: "json"
                                },
                                {
                                    Name: "wcfHeaderSearchBoxText",
                                    Input: "teal",
                                    Output: "rgba(0, 128, 128, 1)",
                                    Source: "json"
                                },
                                {
                                    Name: "foo",
                                    Input: "#000",
                                    Output: "#000",
                                    Source: "json",
                                    Special: true
                                },
                                {
                                    Name: "bar",
                                    Input: "#000",
                                    Output: "#000",
                                    Source: "scss",
                                    Special: true
                                }
                            ];

                            suiteSetup(
                                async () =>
                                {
                                    tempDir = new TempDirectory();
                                    customScss = dedent(
                                        `
                                        :root
                                        {
                                            color: red !important;
                                        }`);

                                    let customScssFileName: string = tempDir.MakePath("custom.scss");
                                    let scssOverrideFileName: string = tempDir.MakePath("override.scss");
                                    let variableFileName: string = tempDir.MakePath("vawriables.json");

                                    await FileSystem.writeFile(customScssFileName, customScss);

                                    await FileSystem.writeFile(
                                        scssOverrideFileName,
                                        variables.filter(
                                            (variable: IVariable) =>
                                            {
                                                return variable.Source === "scss";
                                            }).map(
                                                (variable: IVariable) =>
                                                {
                                                    return `$${variable.Name}: ${variable.Input};`;
                                                }
                                            ).join(OS.EOL));

                                    await FileSystem.writeJson(
                                        variableFileName,
                                        variables.filter(
                                            (variable: IVariable) =>
                                            {
                                                return variable.Source === "json";
                                            }).reduce<{ [key: string]: any }>(
                                                (previousValue: { [key: string]: any }, currentValue: IVariable) =>
                                                {
                                                    previousValue[currentValue.Name] = currentValue.Input;
                                                    return previousValue;
                                                },
                                                {}));

                                    theme = new Theme(
                                        null,
                                        {
                                            Name: "test",
                                            DisplayName: {},
                                            CustomScssFileName: customScssFileName,
                                            ScssOverrideFileName: scssOverrideFileName,
                                            VariableFileName: variableFileName
                                        });
                                });

                            suite(
                                "CustomScss",
                                () =>
                                {
                                    test(
                                        "Checking whether the `CustomScss`-property equals the content of the scss-file...",
                                        () => assert.strictEqual(theme.CustomScss, customScss));
                                });

                            suite(
                                "ScssOverride",
                                () =>
                                {
                                    let specialScssVariable: IVariable;
                                    let specialJsonVariable: IVariable;

                                    suiteSetup(
                                        () =>
                                        {
                                            specialScssVariable = variables.find(
                                                (variable: IVariable) => (variable.Source === "scss") && (variable.Special));
                                            specialJsonVariable = variables.find(
                                                (variable: IVariable) => (variable.Source === "json") && (variable.Special));
                                        });

                                    suite(
                                        "Testing whether special scss-variables are added to `ScssOverride`...",
                                        () =>
                                        {
                                            test(
                                                "Checking whether special scss-variables written in scss are added...",
                                                () =>
                                                {
                                                    assert.strictEqual(theme.ScssOverride.indexOf(`$${specialScssVariable.Name}: ${specialScssVariable.Input};`) >= 0, true);
                                                });

                                            test(
                                                "Checking whether special scss-variables written in json are added...",
                                                () =>
                                                {
                                                    assert.strictEqual(theme.ScssOverride.indexOf(`$${specialJsonVariable.Name}: ${specialJsonVariable.Input};`) >= 0, true);
                                                });
                                        });
                                });

                            suite(
                                "Variables",
                                () =>
                                {
                                    let scssVariable: IVariable;
                                    let jsonVariable: IVariable;

                                    suiteSetup(
                                        () =>
                                        {
                                            scssVariable = variables.find(
                                                (variable: IVariable) => (variable.Source === "scss") && (!variable.Special));
                                            jsonVariable = variables.find(
                                                (variable: IVariable) => (variable.Source === "json") && (!variable.Special));
                                        });

                                    suite(
                                        "Testing whether normal variables are added to to `Variables`...",
                                        () =>
                                        {
                                            test(
                                                "Checking whether variables written in scss are added...",
                                                () =>
                                                {
                                                    assert.strictEqual(scssVariable.Name in theme.Variables, true);
                                                });

                                            test(
                                                "Checking whether variables written in json are added...",
                                                () =>
                                                {
                                                    assert.strictEqual(jsonVariable.Name in theme.Variables, true);
                                                });
                                        });

                                    suite(
                                        "Testing whether normal variables are parsed correctly...",
                                        () =>
                                        {
                                            for (let variable of variables)
                                            {
                                                if (!variable.Special)
                                                {
                                                    test(
                                                        `Checking whether "${variable.Input}" is parsed correctly (expecting "${variable.Output}")...`,
                                                        () =>
                                                        {
                                                            assert.strictEqual(theme.Variables[variable.Name], variable.Output);
                                                        });
                                                }
                                            }
                                        });
                                });

                            suiteTeardown(
                                () =>
                                {
                                    tempDir.Dispose();
                                });
                        });
                });
        });
});