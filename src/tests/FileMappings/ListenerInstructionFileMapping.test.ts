import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IListenerInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { ListenerInstructionFileMapping } from "../../FileMappings/ListenerInstructionFileMapping";
import { TemplateListenerComponent } from "../../generators/package/Components/TemplateListenerComponent";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link ListenerInstructionFileMapping `ListenerInstructionFileMapping<TSettings, TOptions, TComponentOptions`} class.
 *
 * @param context
 * The test-context.
 */
export function ListenerInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(ListenerInstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestListenerInstructionFileMapping;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;

                    options = {
                        [WoltLabComponentKey.Path]: `${random.string(20)}.ts`
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.TemplateListener]: options
                    };

                    fileMapping = new TestListenerInstructionFileMapping(new TemplateListenerComponent(generator));
                });

            suite(
                nameof<TestListenerInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let optionName = nameof<IListenerInstructionOptions<any>>((options) => options.Listeners);

                    test(
                        `Checking whether the options contain a \`${optionName}\`-array…`,
                        () =>
                        {
                            doesNotThrow(
                                () =>
                                {
                                    fileMapping.InstructionOptions.getProperty(optionName).asKindOrThrow(
                                        SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
                                });
                        });
                });
        });
}
