import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as npm from "npm";
import * as Path from "path";
import * as ts from "typescript";
import { isNullOrUndefined } from "util";
import * as helpers from "yeoman-test";

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
            function(): void
            {
                this.timeout(5 * 1000);
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
                                    destination: "./",
                                    name: packageName,
                                    displayName,
                                    identifier,
                                    components: []
                                });
                    });

                test("Checking whether the generator can be executed...",
                    async function(): Promise<void>
                    {
                        this.slow(5000);
                        this.timeout(5000);
                        tempDir = await packageContext;
                        tsConfigFile = Path.join(tempDir, "tsconfig.json");
                        packageFileName = Path.join(tempDir, "Package");
                    });

                test(
                    "Checking whether the package-dependencies can be installed...",
                    async function(): Promise<void>
                    {
                        this.slow(1 * 60 * 1000);
                        this.timeout(1 * 60 * 1000);

                        let consoleLog: any = console.log;
                        console.log = (): void => { };
                        {
                            await new Promise(
                                (resolve: (result: any) => void, reject: (reason: any) => void): void =>
                                {
                                    npm.load(
                                        {
                                            loaded: false
                                        } as any,
                                        (error: Error, result: any) =>
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
                                (resolve: (result: any) => void, reject: (reason: any) => void): void =>
                                {
                                    npm.commands.install(
                                        [],
                                        (err: Error, result: any) =>
                                        {
                                            if (!isNullOrUndefined(err))
                                            {
                                                reject(err);
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
                    function(): void
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host: ts.ParseConfigFileHost = {
                            ...ts.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: ts.Diagnostic): void =>
                            {
                                throw diagnostic;
                            }
                        } as ts.ParseConfigFileHost;

                        let config: ts.ParsedCommandLine = ts.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult: ts.EmitResult = ts.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        assert.strictEqual(compilerResult.emitSkipped, false);
                    });

                test(
                    "Checking the integrity of the package-manifest...",
                    () =>
                    {
                        let $package: any = require(packageFileName);
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
                        themeFileName = Path.join(tempDir, themePath, name, "Theme");
                        themeContext = helpers.run(
                            generatorRoot,
                            {
                                tmpdir: false
                            }).withPrompts(
                                {
                                    themePath,
                                    name,
                                    displayName,
                                    components: []
                                });
                    });

                test(
                    "Checking whether the generator can be executed...",
                    async () =>
                    {
                        await themeContext;
                    });

                test(
                    "Checking whether the theme-file can be compiled using typescript...",
                    function(): void
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host: ts.ParseConfigFileHost = {
                            ...ts.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: ts.Diagnostic): void =>
                            {
                                throw diagnostic;
                            }
                        } as ts.ParseConfigFileHost;

                        let config: ts.ParsedCommandLine = ts.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult: ts.EmitResult = ts.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        assert.strictEqual(compilerResult.emitSkipped, false);
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