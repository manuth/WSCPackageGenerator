import { doesNotThrow, strictEqual } from "assert";
import { exec } from "child_process";
import { promisify } from "util";
import { IRunContext, TestContext } from "@manuth/extended-yo-generator-test";
import { GeneratorName, TSConfigFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { InvariantCultureName, Package } from "@manuth/woltlab-compiler";
import { pathExists } from "fs-extra";
import mock = require("mock-require");
import { createProgram, Diagnostic, getParsedCommandLineOfConfigFile, ParseConfigFileHost, ParsedCommandLine, sys } from "typescript";
import { join } from "upath";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

suite(
    "Generators",
    () =>
    {
        let currentDir: string;

        suiteSetup(
            () =>
            {
                currentDir = process.cwd();
            });

        suiteTeardown(
            function()
            {
                process.chdir(currentDir);
            });

        suite(
            "Package-Generator",
            () =>
            {
                let context: TestContext<WoltLabPackageGenerator>;
                let runContext: IRunContext<WoltLabPackageGenerator>;
                let generator: WoltLabPackageGenerator;
                let testContext: IRunContext<WoltLabPackageGenerator>;
                let outputDir: string;
                let tsConfigFile: string;
                let generatorRoot: string;
                let packageName: string;
                let displayName: string;
                let identifier: string;

                suiteSetup(
                    async function()
                    {
                        this.timeout(10 * 60 * 1000);
                        generatorRoot = join(__dirname, "..", "..", "generators", GeneratorName.Main);
                        packageName = "MyPackage";
                        displayName = "This is a test";
                        identifier = "com.example.mypackage";
                        context = GetTestContext();
                        runContext = GetRunContext(context);
                        await runContext.toPromise();
                        generator = runContext.generator;
                        outputDir = generator.destinationPath();
                        tsConfigFile = join(outputDir, TSConfigFileMapping.FileName);

                        await promisify(exec)(
                            "npm install",
                            {
                                cwd: outputDir
                            });
                    });

                suiteTeardown(
                    function()
                    {
                        this.timeout(1 * 60 * 1000);
                        context.Dispose();
                    });

                setup(
                    async function()
                    {
                        this.timeout(5 * 60 * 1000);
                        testContext = GetRunContext();
                        await testContext.toPromise();
                    });

                teardown(
                    function()
                    {
                        this.timeout(1 * 60 * 1000);
                        testContext.cleanTestDirectory();
                    });

                /**
                 * Gets a {@link TestContext `TestContext<TGenerator, TOptions>`} for running the generator.
                 *
                 * @returns
                 * A {@link RunContext `RunContext`} for running the generator.
                 */
                function GetTestContext(): TestContext<WoltLabPackageGenerator>
                {
                    return new TestContext(generatorRoot);
                }

                /**
                 * Gets an {@link IRunContext `IRunContext<T>`} for running the generator.
                 *
                 * @param testContext
                 * The {@link TestContext `TestContext<TGenerator, TOptions>`} for creating a new {@link IRunContext `IRunContext<T>`}.
                 *
                 * @returns
                 * An {@link IRunContext `IRunContext<T>`} for running the generator.
                 */
                function GetRunContext(testContext?: TestContext<WoltLabPackageGenerator>): IRunContext<WoltLabPackageGenerator>
                {
                    return (testContext ?? GetTestContext()).ExecuteGenerator().withPrompts(
                        {
                            [TSProjectSettingKey.Destination]: "./",
                            [TSProjectSettingKey.Name]: packageName,
                            [TSProjectSettingKey.DisplayName]: displayName,
                            [WoltLabSettingKey.Identifier]: identifier,
                            [TSProjectSettingKey.Description]: "This is a test",
                            [WoltLabSettingKey.Author]: "Manuel Thalmann",
                            [WoltLabSettingKey.HomePage]: "https://nuth.ch"
                        });
                }

                /**
                 * Gets the parsed typescript-configuration.
                 *
                 * @returns
                 * The parsed typescript-configuration.
                 */
                function GetTSConfig(): ParsedCommandLine
                {
                    let host = {
                        ...sys,
                        onUnRecoverableConfigFileDiagnostic: (diagnostic: Diagnostic): void =>
                        {
                            throw new Error();
                        }
                    } as ParseConfigFileHost;

                    return getParsedCommandLineOfConfigFile(tsConfigFile, {}, host);
                }

                test(
                    "Checking whether the generator can be executed…",
                    async function()
                    {
                        this.slow(1 * 60 * 1000);
                        this.timeout(2 * 60 * 1000);
                        doesNotThrow(async () => GetRunContext().toPromise());
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
                                cwd: testContext.generator.destinationPath()
                            });
                    });

                test(
                    "Checking whether a typescript-config exists…",
                    async function()
                    {
                        this.slow(5 * 1000);
                        this.timeout(10 * 1000);
                        strictEqual(await pathExists(tsConfigFile), true);
                    });

                test(
                    "Checking whether the package-file can be compiled using typescript…",
                    function()
                    {
                        this.slow(20 * 1000);
                        this.timeout(20 * 1000);

                        let config = GetTSConfig();

                        let compilerResult = createProgram(
                            {
                                rootNames: config.fileNames,
                                options: config.options
                            }).emit();

                        strictEqual(compilerResult.emitSkipped, false);
                    });

                test(
                    "Checking the integrity of the package-manifest…",
                    async function()
                    {
                        this.slow(15 * 1000);
                        this.timeout(30 * 1000);
                        let compilerDependency = "@manuth/woltlab-compiler";
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        mock(compilerDependency, require(compilerDependency));

                        try
                        {
                            let $package: Package = (await new TypeScriptFileMappingTester(generator, generator.WoltLabPackageFileMapping).Require())[generator.PackageVariableName];
                            strictEqual($package.Name, packageName);
                            strictEqual($package.DisplayName.Data.get(InvariantCultureName), displayName);
                            strictEqual($package.Identifier, identifier);
                        }
                        catch (exception)
                        {
                            throw exception;
                        }
                        finally
                        {
                            mock.stop(compilerDependency);
                        }
                    });
            });
    });
