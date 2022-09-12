import { doesNotReject, ok, strictEqual } from "assert";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IThemeInstructionOptions, IThemeLoaderOptions } from "@manuth/woltlab-compiler";
import npmWhich from "npm-which";
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import { ObjectLiteralExpression, printNode, SourceFile, SyntaxKind, ts } from "ts-morph";
import { InstructionComponent } from "../../Components/InstructionComponent.js";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping.js";
import { ThemeInstructionComponent } from "../../generators/package/Components/ThemeInstructionComponent.js";
import { ThemeInstructionFileMapping } from "../../generators/package/FileMappings/ThemeInstructionFileMapping.js";
import { IThemeComponentOptions } from "../../generators/package/Settings/IThemeComponentOptions.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The text-context.
 */
export function InstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(InstructionFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestInstructionFileMapping extends InstructionFileMapping<IWoltLabSettings, GeneratorOptions, IThemeComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get Component(): InstructionComponent<IWoltLabSettings, GeneratorOptions, IThemeComponentOptions>
                {
                    return super.Component;
                }

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
            let fileMapping: TestInstructionFileMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestInstructionFileMapping>;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestInstructionFileMapping(new ThemeInstructionComponent(generator));
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);

                    spawnSync(
                        npmWhich(fileURLToPath(new URL(".", import.meta.url))).sync("npm"),
                        [
                            "install",
                            "--silent"
                        ],
                        {
                            cwd: generator.destinationPath(),
                            stdio: "ignore"
                        });
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        Name: "theme",
                        DisplayName: "Theme",
                        Description: "test",
                        Components: []
                    } as IThemeComponentOptions;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.Theme]: options
                    };
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    test(
                        `Checking whether a correct \`${nameof(ObjectLiteralExpression)}\`-instance is returned…`,
                        () =>
                        {
                            ok(fileMapping.InstructionOptions instanceof ObjectLiteralExpression);
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.Destination),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<TestInstructionFileMapping>((fm) => fm.Destination)}\` chosen by the user is returned…`,
                        () =>
                        {
                            strictEqual(fileMapping.Destination, options[WoltLabComponentSettingKey.Path]);
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    let sandbox: SinonSandbox;

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            sandbox = createSandbox();

                            sandbox.replaceGetter(
                                fileMapping,
                                "InstructionOptions",
                                () =>
                                {
                                    let result = (new ThemeInstructionFileMapping(fileMapping.Component) as any as TestInstructionFileMapping).InstructionOptions;
                                    let theme = result.getProperty(nameof<IThemeInstructionOptions>((options) => options.Theme)).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializer().asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                                    theme.getProperty(nameof<IThemeLoaderOptions>((options) => options.DisplayName)).asKindOrThrow(SyntaxKind.PropertyAssignment).setInitializer(printNode(ts.factory.createObjectLiteralExpression()));
                                    return result;
                                });

                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                        });

                    teardown(
                        async function()
                        {
                            sandbox.restore();
                        });

                    test(
                        "Checking whether the output is valid TypeScript-code…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            await doesNotReject(() => tester.Import());
                        });
                });
        });
}
