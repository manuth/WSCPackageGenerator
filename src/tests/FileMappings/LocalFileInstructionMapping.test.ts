import { doesNotReject, doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { LocalFileInstructionMapping } from "../../FileMappings/LocalFileInstructionMapping.js";
import { SQLScriptComponent } from "../../generators/package/Components/SQLScriptComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { ILocalComponentOptions } from "../../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function LocalFileInstructionMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(LocalFileInstructionMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestLocalFileInstructionMapping extends LocalFileInstructionMapping<IWoltLabSettings, GeneratorOptions, ILocalComponentOptions>
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
            let fileMapping: TestLocalFileInstructionMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestLocalFileInstructionMapping>;
            let options: ILocalComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestLocalFileInstructionMapping(new SQLScriptComponent(generator));
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        Source: generator.destinationPath("assets", "install.sql")
                    } as ILocalComponentOptions;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.SQLScript]: options
                    };
                });

            suite(
                nameof<TestLocalFileInstructionMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IFileSystemInstructionOptions>((options) => options.Source);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added…`,
                        () =>
                        {
                            doesNotThrow(() => fileMapping.InstructionOptions.getPropertyOrThrow(propertyName));
                        });
                });

            suite(
                nameof<TestLocalFileInstructionMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                        });

                    test(
                        "Checking whether valid TypeScript-code is produced…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            await doesNotReject(() => tester.Require());
                        });
                });
        });
}
