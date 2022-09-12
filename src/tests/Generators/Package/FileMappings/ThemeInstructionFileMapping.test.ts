import { doesNotReject, ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { InvariantCultureName, IThemeInstructionOptions, IThemeLoaderOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { ThemeInstructionComponent } from "../../../../generators/package/Components/ThemeInstructionComponent.js";
import { ThemeInstructionFileMapping } from "../../../../generators/package/FileMappings/ThemeInstructionFileMapping.js";
import { IThemeComponentOptions } from "../../../../generators/package/Settings/IThemeComponentOptions.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { ThemeComponent } from "../../../../generators/package/Settings/ThemeComponent.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link ThemeInstructionFileMapping `ThemeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function ThemeInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(ThemeInstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestThemeInstructionFileMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestThemeInstructionFileMapping>;
            let options: IThemeComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestThemeInstructionFileMapping(new ThemeInstructionComponent(generator));
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        Name: "test",
                        DisplayName: "Test",
                        Description: "This is a test.",
                        Components: [
                            ThemeComponent.CustomScss,
                            ThemeComponent.ScssOverrides,
                            ThemeComponent.Variables
                        ],
                        CustomScssFileName: generator.assetPath("main.scss"),
                        ScssOverridesFileName: generator.assetPath("overrides.scss"),
                        VariableFileName: generator.assetPath("variables.json")
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.Theme]: options
                    };
                });

            suite(
                nameof<TestThemeInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    /**
                     * Writes the file for testing purposes.
                     */
                    async function WriteFile(): Promise<void>
                    {
                        let file = await fileMapping.GetSourceObject();

                        file.addExportAssignment(
                            {
                                expression: fileMapping.InstructionOptions.getFullText()
                            });

                        file.addImportDeclarations((await fileMapping.Transform(await fileMapping.GetSourceObject())).getImportDeclarations().map(
                            (importDeclaration) => importDeclaration.getStructure()));

                        await tester.DumpOutput(file);
                    }

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            await WriteFile();
                        });

                    test(
                        "Checking whether the settings are applied correctly…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            let themeOptions: IThemeInstructionOptions = await tester.Require();
                            strictEqual(themeOptions.Theme.DisplayName[InvariantCultureName], options.DisplayName);
                            strictEqual(themeOptions.Theme.Name, options.Name);
                        });

                    test(
                        "Checking whether file-paths are included only if their corresponding component is activated…",
                        async function()
                        {
                            this.slow(45 * 1000);
                            this.timeout(1.5 * 60 * 1000);
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
                                await WriteFile();
                                ok(!(assertion[1] in (await tester.Require() as IThemeInstructionOptions).Theme));
                                options.Components = [assertion[0]];
                                await WriteFile();
                                ok(assertion[1] in (await tester.Require() as IThemeInstructionOptions).Theme);
                            }
                        });
                });

            suite(
                nameof<TestThemeInstructionFileMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                        });

                    test(
                        "Checking whether the generated code is valid…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            await doesNotReject(() => tester.Require());
                        });
                });
        });
}
