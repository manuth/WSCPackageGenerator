import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IEmojiInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { EmojiComponent } from "../../../../generators/package/Components/EmojiComponent.js";
import { EmojiInstructionFileMapping } from "../../../../generators/package/FileMappings/EmojiInstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { InstructionFileMappingSuite } from "../../../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link EmojiInstructionFileMapping `EmojiInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function EmojiInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link EmojiInstructionFileMapping `EmojiInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestEmojiInstructionFileMapping extends EmojiInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestEmojiInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(EmojiInstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestEmojiInstructionFileMapping
        {
            return new TestEmojiInstructionFileMapping(new EmojiComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestEmojiInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IEmojiInstructionOptions>((instruction) => instruction.Emojis);

                    test(
                        `Checking whether the \`${propertyName}\`-property is present…`,
                        () =>
                        {
                            doesNotThrow(
                                () => this.FileMappingOptions.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression));
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
