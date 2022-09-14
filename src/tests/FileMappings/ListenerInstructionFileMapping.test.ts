import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IListenerInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { ListenerInstructionFileMapping } from "../../FileMappings/ListenerInstructionFileMapping.js";
import { TemplateListenerComponent } from "../../generators/package/Components/TemplateListenerComponent.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link ListenerInstructionFileMapping `ListenerInstructionFileMapping<TSettings, TOptions, TComponentOptions`} class.
 *
 * @param context
 * The test-context.
 */
export function ListenerInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link ListenerInstructionFileMapping `ListenerInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestListenerInstructionFileMapping extends ListenerInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestListenerInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(ListenerInstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestListenerInstructionFileMapping
        {
            return new TestListenerInstructionFileMapping(new TemplateListenerComponent(this.Generator));
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
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestListenerInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IListenerInstructionOptions<any>>((options) => options.Listeners);

                    test(
                        `Checking whether the options contain a \`${propertyName}\`-array…`,
                        () =>
                        {
                            doesNotThrow(
                                () =>
                                {
                                    this.FileMappingOptions.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                                        SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
                                });
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
