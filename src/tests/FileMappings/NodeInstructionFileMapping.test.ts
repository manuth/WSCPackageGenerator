import { doesNotThrow } from "assert";
import { AbstractConstructor, GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { INodeSystemInstructionOptions, Instruction, NodeSystemInstruction } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { NodeInstructionFileMapping } from "../../FileMappings/NodeInstructionFileMapping.js";
import { OptionComponent } from "../../generators/package/Components/OptionComponent.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link NodeInstructionFileMapping `NodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function NodeInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link NodeInstructionFileMapping `NodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestNodeInstructionFileMapping extends NodeInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestNodeInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(NodeInstructionFileMapping);
        }

        /**
         * @inheritdoc
         */
        protected override get InstructionClass(): AbstractConstructor<Instruction>
        {
            return NodeSystemInstruction;
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestNodeInstructionFileMapping
        {
            return new TestNodeInstructionFileMapping(new OptionComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestNodeInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<INodeSystemInstructionOptions<any>>((options) => options.Nodes);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added properly…`,
                        () =>
                        {
                            doesNotThrow(() =>
                            {
                                this.FileMappingOptions.InstructionOptions.getPropertyOrThrow(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
                            });
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
