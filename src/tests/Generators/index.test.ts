import { strictEqual } from "assert";
import { exec } from "child_process";
import { promisify } from "util";
import { GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { mkdirp, pathExists, remove, symlink } from "fs-extra";
import { createProgram, Diagnostic, getParsedCommandLineOfConfigFile, ParseConfigFileHost, sys } from "typescript";
import { dirname, isAbsolute, join } from "upath";
import { run, RunContext } from "yeoman-test";
import { WoltLabPackageGenerator } from "../../generators/app/WoltLabPackageGenerator";
import { WoltLabSettingKey } from "../../WoltLabSettingKey";
import { WoltLabUnitName } from "../../WoltLabUnitName";

suite(
    "Generators",
    () =>
    {
        let currentDir: string;
        let tempDir: string;
        let tsConfigFile: string;
        let packageContext: RunContext;
        let themePath: string;
        let themeContext: RunContext;

        suiteSetup(
            () =>
            {
                currentDir = process.cwd();
            });

        suiteTeardown(
            function()
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
                        generatorRoot = join(__dirname, "..", "..", "generators", "app");
                        packageName = "MyPackage";
                        displayName = "This is a test";
                        identifier = "com.example.mypackage";
                        packageContext = run(
                            generatorRoot).withPrompts(
                                {
                                    [TSProjectSettingKey.Destination]: "./",
                                    [TSProjectSettingKey.Name]: packageName,
                                    [TSProjectSettingKey.DisplayName]: displayName,
                                    [WoltLabSettingKey.Identifier]: identifier,
                                    [WoltLabSettingKey.Author]: "Manuel Thalmann",
                                    [WoltLabSettingKey.HomePage]: "https://nuth.ch",
                                    [GeneratorSettingKey.Components]: [
                                        WoltLabUnitName.Themes
                                    ],
                                    [`${WoltLabSettingKey.UnitPaths}[${WoltLabUnitName.Themes}]`]: "src/Themes"
                                });
                    });

                test(
                    "Checking whether the generator can be executed…",
                    async function()
                    {
                        this.slow(1 * 60 * 1000);
                        this.timeout(2 * 60 * 1000);
                        let generator: WoltLabPackageGenerator;
                        tempDir = await packageContext.toPromise();
                        generator = (packageContext as any).generator;
                        themePath = generator.Settings[WoltLabSettingKey.UnitPaths][WoltLabUnitName.Themes];
                        tsConfigFile = join(tempDir, "tsconfig.json");
                    });

                test(
                    "Checking whether the package-dependencies can be installed…",
                    async function()
                    {
                        this.slow(5 * 60 * 1000);
                        this.timeout(5 * 60 * 1000);
                        await promisify(exec)(
                            "npm install",
                            {
                                cwd: tempDir
                            });

                        for (let module of ["node-sass"])
                        {
                            let source = join(__dirname, "..", "..", "..", "node_modules", module);
                            let target = join(tempDir, "node_modules", module);
                            await remove(target);
                            await mkdirp(dirname(target));
                            await symlink(source, target, "junction");
                        }
                    });

                test(
                    "Checking whether a typescript-config exists…",
                    async () =>
                    {
                        strictEqual(await pathExists(tsConfigFile), true);
                    });

                test(
                    "Checking whether the package-file can be compiled using typescript…",
                    function()
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: Diagnostic): void =>
                            {
                                throw new Error();
                            }
                        } as ParseConfigFileHost;

                        let config = getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        strictEqual(compilerResult.emitSkipped, false);
                        let baseDir = isAbsolute(config.options.outDir) ? config.options.outDir : join(tempDir, config.options.outDir);
                        packageFileName = join(baseDir, "Meta", "Package");
                    });

                test(
                    "Checking the integrity of the package-manifest…",
                    () =>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        let $package = require(packageFileName);
                        strictEqual($package["Name"], packageName);
                        strictEqual($package["DisplayName"]["inv"], displayName);
                        strictEqual($package["Identifier"], identifier);
                    });
            });

        suite(
            "Theme-Generator",
            () =>
            {
                let generatorRoot: string;
                let themeFileName: string;
                let name: string;
                let displayName: string;

                suiteSetup(
                    () =>
                    {
                        generatorRoot = join(__dirname, "..", "..", "generators", "theme");
                        name = "MyTheme";
                        displayName = "This is a test";
                        themeContext = run(
                            generatorRoot,
                            {
                                tmpdir: false
                            }).withPrompts(
                                {
                                    [TSProjectSettingKey.Destination]: "./",
                                    [TSProjectSettingKey.Name]: name,
                                    [TSProjectSettingKey.DisplayName]: displayName
                                });
                    });

                test(
                    "Checking whether the generator can be executed…",
                    async () =>
                    {
                        await themeContext.toPromise();
                        console.log();
                    });

                test(
                    "Checking whether the theme-file can be compiled using typescript…",
                    function(): void
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: Diagnostic): void =>
                            {
                                throw new Error();
                            }
                        } as ParseConfigFileHost;

                        let config = getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        strictEqual(compilerResult.emitSkipped, false);
                        let baseDir = isAbsolute(config.options.outDir) ? config.options.outDir : join(tempDir, config.options.outDir);
                        themeFileName = join(baseDir, themePath, name, "Theme");
                    });

                test(
                    "Checking the integrity of the theme-manifest…",
                    () =>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        let theme: any = require(themeFileName);
                        strictEqual(theme["Name"], name);
                        strictEqual(theme["DisplayName"]["inv"], displayName);
                    });
            });
    });
