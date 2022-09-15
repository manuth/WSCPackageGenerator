import { ok, strictEqual } from "node:assert";
import { pathToFileURL } from "node:url";
import { AbstractConstructor, GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TempDirectory } from "@manuth/temp-files";
import { Instruction, InvariantCultureName, IThemeInstructionOptions, IThemeLoaderOptions, ThemeInstruction } from "@manuth/woltlab-compiler";
import { ModuleKind, ObjectLiteralExpression, Project, SourceFile } from "ts-morph";
import path from "upath";
import { ThemeInstructionComponent } from "../../../../generators/package/Components/ThemeInstructionComponent.js";
import { ThemeInstructionFileMapping } from "../../../../generators/package/FileMappings/ThemeInstructionFileMapping.js";
import { IThemeComponentOptions } from "../../../../generators/package/Settings/IThemeComponentOptions.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { ThemeComponent } from "../../../../generators/package/Settings/ThemeComponent.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../../../InstructionFileMappingSuite.js";
import { TypeScriptCompilerTester } from "../../../TypeScriptCompilerTester.js";

const { normalize, parse } = path;

/**
 * Registers tests for the {@link ThemeInstructionFileMapping `ThemeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function ThemeInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link ThemeInstructionFileMapping `ThemeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestThemeInstructionFileMapping extends ThemeInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IThemeComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }

        /**
         * @inheritdoc
         *
         * @param file
         * The {@link SourceFile `SourceFile`} to transform.
         *
         * @returns
         * The transformed file.
         */
        public override async Transform(file: SourceFile): Promise<SourceFile>
        {
            return super.Transform(file);
        }
    }

    let options: IThemeComponentOptions;

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IThemeComponentOptions, TestThemeInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(ThemeInstructionFileMapping);
        }

        /**
         * @inheritdoc
         */
        protected override get InstructionClass(): AbstractConstructor<Instruction>
        {
            return ThemeInstruction;
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestThemeInstructionFileMapping
        {
            return new TestThemeInstructionFileMapping(new ThemeInstructionComponent(this.Generator));
        }

        /**
         * @inheritdoc
         *
         * @param context
         * The mocha context.
         */
        protected override async Setup(context: Mocha.Context): Promise<void>
        {
            await super.Setup(context);

            options = {
                ...this.Component.ComponentOptions,
                Name: "test",
                DisplayName: "Test",
                Description: "This is a test.",
                Components: [
                    ThemeComponent.CustomScss,
                    ThemeComponent.ScssOverrides,
                    ThemeComponent.Variables
                ],
                CustomScssFileName: this.Generator.assetPath("main.scss"),
                ScssOverridesFileName: this.Generator.assetPath("overrides.scss"),
                VariableFileName: this.Generator.assetPath("variables.json")
            };

            this.Generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                [PackageComponentType.Theme]: options
            };
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestThemeInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let generator: WoltLabPackageGenerator;
                    let tempDir: TempDirectory;
                    let fileMapping: TestThemeInstructionFileMapping;
                    let tester: TypeScriptCompilerTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestThemeInstructionFileMapping>;
                    let themeOptions: IThemeInstructionOptions;

                    suiteSetup(
                        () =>
                        {
                            generator = this.Generator;
                            fileMapping = this.FileMappingOptions;
                            tester = this.Tester;
                        });

                    /**
                     * Writes the file for testing purposes.
                     */
                    async function PrepareTest(): Promise<void>
                    {
                        let file = await fileMapping.GetSourceObject();

                        file.addExportAssignment(
                            {
                                isExportEquals: false,
                                expression: fileMapping.InstructionOptions.getFullText()
                            });

                        file.addImportDeclarations((await fileMapping.Transform(await fileMapping.GetSourceObject())).getImportDeclarations().map(
                            (importDeclaration) => importDeclaration.getStructure()));

                        let project = new Project();
                        await tester.DumpOutput(file);
                        file = project.addSourceFileAtPath(tester.FileMapping.Destination);

                        project.compilerOptions.set(
                            {
                                module: ModuleKind.ES2022
                            });

                        await file.emit();

                        let outFile = file.getEmitOutput().getOutputFiles().find(
                            (outFile) =>
                            {
                                return parse(outFile.getFilePath()).name === parse(tester.FileMapping.Destination).name;
                            }).getFilePath();

                        themeOptions = (await import(pathToFileURL(outFile).toString())).default;
                    }

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            tempDir = new TempDirectory();
                            await PrepareTest();
                        });

                    teardown(
                        () =>
                        {
                            tempDir.Dispose();
                        });

                    test(
                        "Checking whether the settings are applied correctly…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            strictEqual(themeOptions.Theme.DisplayName[InvariantCultureName], options.DisplayName);
                            strictEqual(themeOptions.Theme.Name, options.Name);
                            strictEqual(themeOptions.Theme.Description[InvariantCultureName], options.Description);

                            strictEqual(
                                normalize(themeOptions.Theme.CustomScssFileName),
                                normalize(generator.destinationPath(options.CustomScssFileName)));

                            strictEqual(
                                normalize(themeOptions.Theme.ScssOverrideFileName),
                                normalize(generator.destinationPath(options.ScssOverridesFileName)));

                            strictEqual(
                                normalize(themeOptions.Theme.VariableFileName),
                                normalize(generator.destinationPath(options.VariableFileName)));
                        });

                    test(
                        "Checking whether file-paths are included only if their corresponding component is activated…",
                        async function()
                        {
                            this.slow(1.5 * 60 * 1000);
                            this.timeout(3 * 60 * 1000);

                            let assertions = [
                                [
                                    ThemeComponent.CustomScss,
                                    nameof<IThemeLoaderOptions>((options) => options.CustomScssFileName),
                                    options.CustomScssFileName
                                ],
                                [
                                    ThemeComponent.ScssOverrides,
                                    nameof<IThemeLoaderOptions>((options) => options.ScssOverrideFileName),
                                    options.ScssOverridesFileName
                                ]
                            ] as Array<[ThemeComponent, keyof IThemeLoaderOptions, unknown]>;

                            for (let assertion of assertions)
                            {
                                options.Components = [];
                                await PrepareTest();
                                ok(!(assertion[1] in (await tester.ImportDefault() as IThemeInstructionOptions).Theme));
                                options.Components = [assertion[0]];
                                await PrepareTest();
                                ok(assertion[1] in (await tester.ImportDefault() as IThemeInstructionOptions).Theme);
                            }
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
