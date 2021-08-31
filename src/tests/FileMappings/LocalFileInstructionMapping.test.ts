import { doesNotReject, doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import mock = require("mock-require");
import { Random } from "random-js";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { LocalFileInstructionMapping } from "../../FileMappings/LocalFileInstructionMapping";
import { SQLScriptComponent } from "../../generators/package/Components/SQLScriptComponent";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { ILocalComponentOptions } from "../../Settings/ILocalComponentOptions";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

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
                        [WoltLabComponentKey.Path]: `${random.string(20)}.ts`,
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
                    let mockedPackageNames: string[];

                    suiteSetup(
                        () =>
                        {
                            mockedPackageNames = [
                                "@manuth/woltlab-compiler",
                                "path"
                            ];
                        });

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);

                            for (let packageName of mockedPackageNames)
                            {
                                // eslint-disable-next-line @typescript-eslint/no-var-requires
                                mock(packageName, require(packageName));
                            }

                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                        });

                    teardown(
                        () =>
                        {
                            for (let packageName of mockedPackageNames)
                            {
                                mock.stop(packageName);
                            }
                        });

                    test(
                        "Checking whether valid TypeScript-code is produced…",
                        async () =>
                        {
                            await doesNotReject(() => tester.Require());
                        });
                });
        });
}
