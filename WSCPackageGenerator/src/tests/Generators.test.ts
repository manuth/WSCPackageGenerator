import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as npm from "npm";
import * as Path from "path";
import * as ts from "typescript";
import { isNullOrUndefined } from "util";
import * as helpers from "yeoman-test";
import { WSCPackageSetting } from "../generators/app/WSCPackageSetting";
import { WSCThemeSetting } from "../generators/theme/WSCThemeSetting";

suite(
    "Generators",
    () =>
    {
        let currentDir: string;
        let tempDir: string;
        let tsConfigFile: string;
        let packageContext: helpers.RunContext;
        let themeContext: helpers.RunContext;

        suiteSetup(
            () =>
            {
                currentDir = process.cwd();
            });

        suiteTeardown(
            function ()
            {
                this.timeout(1 * 60 * 1000);
                process.chdir(currentDir);
                packageContext.cleanTestDirectory();
            });

        suite(
            "Package-Generator",
            () =>
            {
                let generatorRoot: string;
                let packageFileName: string;
                let packageName: string;
                let displayName: string;
                let identifier: string;

                suiteSetup(
                    () =>
                    {
                        generatorRoot = Path.join(__dirname, "..", "generators", "app");
                        packageName = "MyPackage";
                        displayName = "This is a test";
                        identifier = "com.example.mypackage";
                        packageContext = helpers.run(
                            generatorRoot).withPrompts(
                                {
                                    [WSCPackageSetting.Destination]: "./",
                                    [WSCPackageSetting.Name]: packageName,
                                    [WSCPackageSetting.DisplayName]: displayName,
                                    [WSCPackageSetting.Identifier]: identifier,
                                    [WSCPackageSetting.Author]: "Manuel Thalmann",
                                    [WSCPackageSetting.HomePage]: "https://nuth.ch"
                                });
                    });

                test(
                    "Checking whether the generator can be executed...",
                    async function ()
                    {
                        this.slow(5000);
                        this.timeout(5000);
                        tempDir = await packageContext.toPromise();
                        tsConfigFile = Path.join(tempDir, "tsconfig.json");
                    });

                test(
                    "Checking whether the package-dependencies can be installed...",
                    async function ()
                    {
                        this.slow(5 * 60 * 1000);
                        this.timeout(5 * 60 * 1000);

                        let consoleLog = console.log;
                        console.log = () => { };
                        {
                            await new Promise(
                                (resolve, reject) =>
                                {
                                    npm.load(
                                        {
                                            loaded: false
                                        } as any,
                                        (error, result) =>
                                        {
                                            if (!isNullOrUndefined(error))
                                            {
                                                reject(error);
                                            }
                                            else
                                            {
                                                resolve(result);
                                            }
                                        });
                                });

                            await new Promise(
                                (resolve, reject) =>
                                {
                                    npm.commands.install(
                                        [],
                                        (error, result) =>
                                        {
                                            if (!isNullOrUndefined(error))
                                            {
                                                reject(error);
                                            }
                                            else
                                            {
                                                resolve(result);
                                            }
                                        });
                                });
                        }
                        console.log = consoleLog;
                    });

                test(
                    "Checking whether a typescript-config exists...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(tsConfigFile), true);
                    });

                test(
                    "Checking whether the package-file can be compiled using typescript...",
                    function ()
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...ts.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: ts.Diagnostic): void =>
                            {
                                throw diagnostic;
                            }
                        } as ts.ParseConfigFileHost;

                        let config = ts.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = ts.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        assert.strictEqual(compilerResult.emitSkipped, false);

                        let baseDir = Path.isAbsolute(config.options.outDir) ? config.options.outDir : Path.join(tempDir, config.options.outDir);
                        packageFileName = Path.join(baseDir, "Meta", "Package");
                    });

                test(
                    "Checking the integrity of the package-manifest...",
                    () =>
                    {
                        let $package = require(packageFileName);
                        assert.strictEqual($package["Name"], packageName);
                        assert.strictEqual($package["DisplayName"]["inv"], displayName);
                        assert.strictEqual($package["Identifier"], identifier);
                    });
            });

        suite(
            "Theme-Generator",
            () =>
            {
                let generatorRoot: string;
                let themeFileName: string;
                let themePath: string;
                let name: string;
                let displayName: string;

                suiteSetup(
                    () =>
                    {
                        generatorRoot = Path.join(__dirname, "..", "generators", "theme");
                        themePath = "MyThemes";
                        name = "MyTheme";
                        displayName = "This is a test";
                        themeContext = helpers.run(
                            generatorRoot,
                            {
                                tmpdir: false
                            }).withPrompts(
                                {
                                    [WSCThemeSetting.Destination]: themePath,
                                    [WSCThemeSetting.Name]: name,
                                    [WSCThemeSetting.DisplayName]: displayName
                                });
                    });

                test(
                    "Checking whether the generator can be executed...",
                    async () =>
                    {
                        await themeContext.toPromise();
                    });

                test(
                    "Checking whether the theme-file can be compiled using typescript...",
                    function (): void
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...ts.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: ts.Diagnostic): void =>
                            {
                                throw diagnostic;
                            }
                        } as ts.ParseConfigFileHost;

                        let config = ts.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = ts.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        assert.strictEqual(compilerResult.emitSkipped, false);

                        let baseDir = Path.isAbsolute(config.options.outDir) ? config.options.outDir : Path.join(tempDir, config.options.outDir);
                        themeFileName = Path.join(baseDir, themePath, name, "Theme");
                    });

                test(
                    "Checking whether the Theme-manifest is formated correctly...",
                    () =>
                    {
                        let theme: any = require(themeFileName);
                        assert.strictEqual(theme["Name"], name);
                        assert.strictEqual(theme["DisplayName"]["inv"], displayName);
                    });
            });
    });