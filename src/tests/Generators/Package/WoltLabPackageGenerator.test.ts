import { deepStrictEqual, doesNotThrow, ok, strictEqual } from "assert";
import { exec, spawnSync } from "child_process";
import { join, normalize } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { ComponentCollection, FileMapping, FileMappingCollectionEditor, GeneratorOptions } from "@manuth/extended-yo-generator";
import { IRunContext, TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings, LintingComponent, TSConfigFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { JSONCFileMappingTester, TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { InvariantCultureName, Package } from "@manuth/woltlab-compiler";
import { pathExists } from "fs-extra";
import npmWhich from "npm-which";
import { TSConfigJSON } from "types-tsconfig";
import { InstructionComponent } from "../../../Components/InstructionComponent.js";
import { WoltLabCodeWorkspaceFolder } from "../../../Components/WoltLabCodeWorkspaceFolder.js";
import { WoltLabNodePackageFileMapping } from "../../../generators/package/FileMappings/WoltLabNodePackageFileMapping.js";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link WoltLabPackageGenerator<TSettings, TOptions> `WoltLabPackageGenerator<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function WoltLabPackageGeneratorTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabPackageGenerator),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabPackageGenerator<TSettings, TOptions> `WoltLabPackageGenerator<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabPackageGenerator extends WoltLabPackageGenerator
            {
                /**
                 * @inheritdoc
                 */
                public override get BaseComponents(): ComponentCollection<ITSProjectSettings, GeneratorOptions>
                {
                    return super.BaseComponents;
                }

                /**
                 * @inheritdoc
                 */
                public override get BaseFileMappings(): FileMappingCollectionEditor
                {
                    return super.BaseFileMappings;
                }
            }

            let generator: TestWoltLabPackageGenerator;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator as TestWoltLabPackageGenerator;
                });

            suite(
                nameof<TestWoltLabPackageGenerator>((generator) => generator.InstructionComponents),
                () =>
                {
                    let allComponents: ComponentCollection<ITSProjectSettings, GeneratorOptions>;
                    let instructionComponents: Array<InstructionComponent<IWoltLabSettings, GeneratorOptions, any>>;

                    setup(
                        () =>
                        {
                            allComponents = generator.BaseComponents;
                            allComponents.Categories.AddRange(generator.Components.Categories);
                            instructionComponents = [];

                            for (let category of allComponents.Categories.Items)
                            {
                                for (let component of category.Components.Items)
                                {
                                    if (component.Object instanceof InstructionComponent)
                                    {
                                        if (!instructionComponents.includes(component.Object))
                                        {
                                            instructionComponents.push(component.Object);
                                        }
                                    }
                                }
                            }
                        });

                    test(
                        "Checking whether all instruction components are present…",
                        () =>
                        {
                            strictEqual(generator.InstructionComponents.length, instructionComponents.length);

                            for (let instructionComponent of instructionComponents)
                            {
                                ok(
                                    generator.InstructionComponents.some(
                                        (component) =>
                                        {
                                            return instructionComponent.constructor === component.constructor;
                                        }));
                            }
                        });
                });

            suite(
                nameof<TestWoltLabPackageGenerator>((generator) => generator.BaseComponents),
                () =>
                {
                    test(
                        "Checking whether the base components are inherited…",
                        () =>
                        {
                            ok(
                                generator.BaseComponents.Categories.Items.some(
                                    (category) =>
                                    {
                                        return category.Components.Items.some(
                                            (component) =>
                                            {
                                                return component.Object instanceof LintingComponent;
                                            });
                                    }));
                        });

                    test(
                        "Checking whether the code-workspace folder is replaced correctly…",
                        () =>
                        {
                            ok(generator.BaseComponents.Categories.Items.some(
                                (category) =>
                                {
                                    return category.Components.Items.some(
                                        (component) =>
                                        {
                                            return component.Object instanceof WoltLabCodeWorkspaceFolder;
                                        });
                                }));
                        });
                });

            suite(
                nameof<TestWoltLabPackageGenerator>((generator) => generator.BaseFileMappings),
                () =>
                {
                    test(
                        "Checking whether the base file-mappings are replaced properly…",
                        () =>
                        {
                            ok(
                                generator.BaseFileMappings.Items.some(
                                    (fileMapping) =>
                                    {
                                        return fileMapping.Object instanceof WoltLabNodePackageFileMapping;
                                    }));
                        });

                    test(
                        "Checking whether unnecessary files are excluded…",
                        () =>
                        {
                            for (
                                let path of [
                                    generator.destinationPath(generator.SourceRoot, "tests", TSConfigFileMapping.FileName),
                                    generator.destinationPath(".mocharc.jsonc")
                                ])
                            {
                                ok(
                                    generator.FileMappingCollection.Items.every(
                                        (fileMapping) =>
                                        {
                                            return normalize(fileMapping.Destination) !== normalize(path);
                                        }));
                            }
                        });

                    test(
                        "Checking whether tsconfig-files are replaced properly…",
                        async function()
                        {
                            this.slow(2 * 1000);
                            this.timeout(4 * 1000);

                            let configFileTester = new JSONCFileMappingTester(
                                generator,
                                generator.FileMappingCollection.Get((fileMapping: FileMapping<any, any>) => fileMapping.Destination === generator.destinationPath(TSConfigFileMapping.FileName)));

                            let buildFileTester = new JSONCFileMappingTester(
                                generator,
                                generator.FileMappingCollection.Get((fileMapping: FileMapping<any, any>) => fileMapping.Destination === generator.destinationPath(TSConfigFileMapping.GetFileName("build"))));

                            await configFileTester.Run();
                            await buildFileTester.Run();

                            deepStrictEqual(
                                JSON.parse(JSON.stringify((await buildFileTester.ParseOutput() as TSConfigJSON).references)),
                                [
                                    {
                                        path: "."
                                    }
                                ]);

                            let config = (await configFileTester.ParseOutput() as TSConfigJSON);
                            ok(!(nameof<TSConfigJSON>((config) => config.compilerOptions.outDir) in config));
                            ok(!(nameof<TSConfigJSON>((config) => config.exclude) in config));
                            strictEqual(config.compilerOptions.noEmit, true);
                        });
                });

            suite(
                nameof<TestWoltLabPackageGenerator>((generator) => generator.FileMappings),
                () =>
                {
                    test(
                        "Checking whether all most important file-mappings are present…",
                        () =>
                        {
                            ok(generator.FileMappings.includes(generator.WoltLabPackageFileMapping));
                            ok(generator.FileMappings.includes(generator.EntryPointFileMapping));

                            ok(
                                generator.FileMappings.some(
                                    (fileMapping) =>
                                    {
                                        return fileMapping.Destination === "README.md";
                                    }));
                        });
                });

            suite(
                "General",
                () =>
                {
                    let packageScriptName: string;
                    let workingDir: string;
                    let runContext: IRunContext<WoltLabPackageGenerator>;
                    let testContext: IRunContext<WoltLabPackageGenerator>;
                    let outputDir: string;
                    let tsConfigFile: string;
                    let packageName: string;
                    let displayName: string;
                    let identifier: string;

                    suiteSetup(
                        async function()
                        {
                            this.timeout(10 * 60 * 1000);
                            packageScriptName = "package";
                            packageName = "MyPackage";
                            displayName = "This is a test";
                            identifier = "com.example.mypackage";
                            runContext = GetRunContext(context);
                            await runContext.toPromise();
                            outputDir = runContext.generator.destinationPath();
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
                            workingDir = process.cwd();
                            testContext = GetRunContext();
                            await testContext.toPromise();
                        });

                    teardown(
                        function()
                        {
                            this.timeout(1 * 60 * 1000);
                            process.chdir(workingDir);
                            testContext.cleanTestDirectory();
                        });

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
                        return (testContext ?? context).ExecuteGenerator().withPrompts(
                            {
                                [TSProjectSettingKey.Name]: packageName,
                                [TSProjectSettingKey.DisplayName]: displayName,
                                [WoltLabSettingKey.Identifier]: identifier,
                                [TSProjectSettingKey.Description]: "This is a test",
                                [WoltLabSettingKey.Author]: "Manuel Thalmann",
                                [WoltLabSettingKey.HomePage]: "https://nuth.ch"
                            }).inTmpDir(null);
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
                        "Checking the integrity of the package-manifest…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);

                            try
                            {
                                let $package: Package = (await new TypeScriptFileMappingTester(runContext.generator, runContext.generator.WoltLabPackageFileMapping).Import())[runContext.generator.PackageVariableName];
                                strictEqual($package.DisplayName.Data.get(InvariantCultureName), displayName);
                                strictEqual($package.Identifier, identifier);
                            }
                            catch (exception)
                            {
                                throw exception;
                            }
                        });

                    test(
                        `Checking whether a package archive can be compiled using the \`${packageScriptName}\`-script…`,
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);

                            let result = spawnSync(
                                npmWhich(fileURLToPath(new URL(".", import.meta.url))).sync("npm"),
                                [
                                    "run",
                                    packageScriptName
                                ],
                                {
                                    cwd: runContext.generator.destinationPath(),
                                    stdio: "ignore"
                                });

                            strictEqual(result.status, 0);
                        });
                });
        });
}
