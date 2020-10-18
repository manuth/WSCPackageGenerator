import Assert = require("assert");
import ChildProcess = require("child_process");
import Path = require("path");
import { promisify } from "util";
import { GeneratorSetting } from "extended-yo-generator";
import FileSystem = require("fs-extra");
import TypeScript = require("typescript");
import { run, RunContext } from "yeoman-test";
import { WSCPackageComponent } from "../../generators/app/WSCPackageComponent";
import { WSCPackageGenerator } from "../../generators/app/WSCPackageGenerator";
import { WSCPackageSetting } from "../../generators/app/WSCPackageSetting";
import { WSCThemeSetting } from "../../generators/theme/WSCThemeSetting";
import { WoltLabGeneratorSetting } from "../../GeneratorSetting";

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
                        generatorRoot = Path.join(__dirname, "..", "..", "generators", "app");
                        packageName = "MyPackage";
                        displayName = "This is a test";
                        identifier = "com.example.mypackage";
                        packageContext = run(
                            generatorRoot).withPrompts(
                                {
                                    [WSCPackageSetting.Destination]: "./",
                                    [WSCPackageSetting.Name]: packageName,
                                    [WSCPackageSetting.DisplayName]: displayName,
                                    [WSCPackageSetting.Identifier]: identifier,
                                    [WSCPackageSetting.Author]: "Manuel Thalmann",
                                    [WSCPackageSetting.HomePage]: "https://nuth.ch",
                                    [GeneratorSetting.Components]: [
                                        WSCPackageComponent.Themes
                                    ]
                                });
                    });

                test(
                    "Checking whether the generator can be executed…",
                    async function()
                    {
                        this.slow(5000);
                        this.timeout(5000);
                        let generator: WSCPackageGenerator;
                        tempDir = await packageContext.toPromise();
                        generator = (packageContext as any).generator;
                        themePath = generator.Settings[WoltLabGeneratorSetting.ComponentPaths][WSCPackageComponent.Themes];
                        tsConfigFile = Path.join(tempDir, "tsconfig.json");
                    });

                test(
                    "Checking whether the package-dependencies can be installed…",
                    async function()
                    {
                        this.slow(5 * 60 * 1000);
                        this.timeout(5 * 60 * 1000);
                        await promisify(ChildProcess.exec)(
                            "npm install",
                            {
                                cwd: tempDir
                            });

                        for (let module of ["node-sass"])
                        {
                            let source = Path.join(__dirname, "..", "..", "..", "node_modules", module);
                            let target = Path.join(tempDir, "node_modules", module);
                            await FileSystem.remove(target);
                            await FileSystem.mkdirp(Path.dirname(target));
                            await FileSystem.symlink(source, target, "junction");
                        }
                    });

                test(
                    "Checking whether a typescript-config exists…",
                    async () =>
                    {
                        Assert.strictEqual(await FileSystem.pathExists(tsConfigFile), true);
                    });

                test(
                    "Checking whether the package-file can be compiled using typescript…",
                    function()
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...TypeScript.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: TypeScript.Diagnostic): void =>
                            {
                                throw new Error();
                            }
                        } as TypeScript.ParseConfigFileHost;

                        let config = TypeScript.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = TypeScript.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        Assert.strictEqual(compilerResult.emitSkipped, false);

                        let baseDir = Path.isAbsolute(config.options.outDir) ? config.options.outDir : Path.join(tempDir, config.options.outDir);
                        packageFileName = Path.join(baseDir, "Meta", "Package");
                    });

                test(
                    "Checking the integrity of the package-manifest…",
                    () =>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        let $package = require(packageFileName);
                        Assert.strictEqual($package["Name"], packageName);
                        Assert.strictEqual($package["DisplayName"]["inv"], displayName);
                        Assert.strictEqual($package["Identifier"], identifier);
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
                        generatorRoot = Path.join(__dirname, "..", "..", "generators", "theme");
                        name = "MyTheme";
                        displayName = "This is a test";
                        themeContext = run(
                            generatorRoot,
                            {
                                tmpdir: false
                            }).withPrompts(
                                {
                                    [WSCThemeSetting.Name]: name,
                                    [WSCThemeSetting.DisplayName]: displayName
                                });
                    });

                test(
                    "Checking whether the generator can be executed…",
                    async () =>
                    {
                        await themeContext.toPromise();
                    });

                test(
                    "Checking whether the theme-file can be compiled using typescript…",
                    function(): void
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let host = {
                            ...TypeScript.sys,
                            onUnRecoverableConfigFileDiagnostic: (diagnostic: TypeScript.Diagnostic): void =>
                            {
                                throw new Error();
                            }
                        } as TypeScript.ParseConfigFileHost;

                        let config = TypeScript.getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                        let compilerResult = TypeScript.createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        Assert.strictEqual(compilerResult.emitSkipped, false);

                        let baseDir = Path.isAbsolute(config.options.outDir) ? config.options.outDir : Path.join(tempDir, config.options.outDir);
                        themeFileName = Path.join(baseDir, themePath, name, "Theme");
                    });

                test(
                    "Checking the integrity of the theme-manifest…",
                    () =>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        let theme: any = require(themeFileName);
                        Assert.strictEqual(theme["Name"], name);
                        Assert.strictEqual(theme["DisplayName"]["inv"], displayName);
                    });
            });
    });
