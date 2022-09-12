import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { INodeSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression } from "ts-morph";
import { NodeInstructionFileMapping } from "../../FileMappings/NodeInstructionFileMapping.js";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link NodeInstructionFileMapping `NodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function NodeInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(NodeInstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestNodeInstructionFileMapping;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestNodeInstructionFileMapping(new BBCodeComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.BBCode]: options
                    };
                });

            suite(
                nameof<TestNodeInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<INodeSystemInstructionOptions<any>>((options) => options.Nodes);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added…`,
                        () =>
                        {
                            doesNotThrow(() => fileMapping.InstructionOptions.getPropertyOrThrow(propertyName));
                        });
                });
        });
}
