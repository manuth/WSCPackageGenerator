import { ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { FileInstructionComponent } from "../../Components/FileInstructionComponent.js";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping.js";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent.js";
import { BBCodeInstructionFileMapping } from "../../generators/package/FileMappings/BBCodeInstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The text-context.
 */
export function InstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link BBCodeInstructionFileMapping `BBCodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestBBCodeFileMapping extends BBCodeInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    /**
     * Provides an implementation of the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestInstructionFileMapping extends InstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get Component(): FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
        {
            return super.Component as FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>;
        }

        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return new TestBBCodeFileMapping(this.Component).InstructionOptions;
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

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(InstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestInstructionFileMapping
        {
            return new TestInstructionFileMapping(new BBCodeComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    test(
                        `Checking whether a correct \`${nameof(ObjectLiteralExpression)}\`-instance is returned…`,
                        () =>
                        {
                            ok(this.FileMappingOptions.InstructionOptions instanceof ObjectLiteralExpression);
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
                            strictEqual(this.FileMappingOptions.Destination, this.Component.ComponentOptions[WoltLabComponentSettingKey.Path]);
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
