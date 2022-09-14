import { ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { FileInstructionComponent } from "../../Components/FileInstructionComponent.js";
import { FileInstructionMapping } from "../../FileMappings/FileInstructionMapping.js";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent.js";
import { BBCodeInstructionFileMapping } from "../../generators/package/FileMappings/BBCodeInstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link FileInstructionMapping `FileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function FileInstructionMappingTests(context: TestContext<WoltLabPackageGenerator>): void
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
     * Provides an implementation of the {@link FileInstructionMapping `FileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestFileInstructionMapping extends FileInstructionMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get Component(): FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
        {
            return super.Component;
        }

        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return new TestBBCodeFileMapping(this.Component).InstructionOptions;
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestFileInstructionMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(FileInstructionMapping);
        }

        /**
         * @inheritdoc
         *
         * @param context
         * The mocha context.
         */
        protected override async SuiteSetup(context: Mocha.Context): Promise<void>
        {
            await super.SuiteSetup(context);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestFileInstructionMapping
        {
            return new TestFileInstructionMapping(new BBCodeComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestFileInstructionMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IInstructionOptions>((o) => o.FileName);

                    test(
                        `Checking whether the \`${propertyName}\` is assigned correctly…`,
                        () =>
                        {
                            let object = this.FileMappingOptions.InstructionOptions;
                            ok(object.getProperty(propertyName));

                            strictEqual(
                                object.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue(),
                                this.FileMappingOptions.Component.OutputFileName);
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
