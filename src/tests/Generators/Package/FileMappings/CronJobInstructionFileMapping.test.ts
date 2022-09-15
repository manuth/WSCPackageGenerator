import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ICronJobInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { CronJobComponent } from "../../../../generators/package/Components/CronJobComponent.js";
import { CronJobInstructionFileMapping } from "../../../../generators/package/FileMappings/CronJobInstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { InstructionFileMappingSuite } from "../../../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link CronJobInstructionFileMapping `CronJobInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function CronJobInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link CronJobInstructionFileMapping `CronJobInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestCronJobInstructionFileMapping extends CronJobInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestCronJobInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(CronJobInstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestCronJobInstructionFileMapping
        {
            return new TestCronJobInstructionFileMapping(new CronJobComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestCronJobInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<ICronJobInstructionOptions>((instruction) => instruction.CronJobs);

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
