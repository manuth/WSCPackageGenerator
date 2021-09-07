import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IBBCodeInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { BBCodeComponent } from "../../../../generators/package/Components/BBCodeComponent";
import { BBCodeInstructionFileMapping } from "../../../../generators/package/FileMappings/BBCodeInstructionFileMapping";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link BBCodeInstructionFileMapping `BBCodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function BBCodeInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(BBCodeInstructionFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link BBCodeInstructionFileMapping `BBCodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestBBCodeInstructionFileMapping extends BBCodeInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
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
            let fileMapping: TestBBCodeInstructionFileMapping;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestBBCodeInstructionFileMapping(new BBCodeComponent(generator));
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
                nameof<TestBBCodeInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IBBCodeInstructionOptions>((instruction) => instruction.BBCodes);

                    test(
                        `Checking whether the \`${propertyName}\`-property is present…`,
                        () =>
                        {
                            doesNotThrow(
                                () => fileMapping.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression));
                        });
                });
        });
}
