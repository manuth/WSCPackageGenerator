import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { LocalFileInstructionMapping } from "../../FileMappings/LocalFileInstructionMapping.js";
import { SQLScriptComponent } from "../../generators/package/Components/SQLScriptComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { ILocalComponentOptions } from "../../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function LocalFileInstructionMappingTests(context: TestContext<WoltLabPackageGenerator>): void
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

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, ILocalComponentOptions, TestLocalFileInstructionMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(LocalFileInstructionMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestLocalFileInstructionMapping
        {
            return new TestLocalFileInstructionMapping(new SQLScriptComponent(this.Generator));
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

            this.Generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                [PackageComponentType.SQLScript]: {
                    ...this.Component.ComponentOptions,
                    Source: this.Generator.destinationPath("assets", "install.sql")
                } as ILocalComponentOptions
            };
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestLocalFileInstructionMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IFileSystemInstructionOptions>((options) => options.Source);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added…`,
                        () =>
                        {
                            doesNotThrow(() => this.FileMappingOptions.InstructionOptions.getPropertyOrThrow(propertyName));
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
