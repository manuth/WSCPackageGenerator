import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IEmojiInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { EmojiComponent } from "../../../../generators/package/Components/EmojiComponent";
import { EmojiInstructionFileMapping } from "../../../../generators/package/FileMappings/EmojiInstructionFileMapping";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link EmojiInstructionFileMapping `EmojiInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function EmojiInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(EmojiInstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestEmojiInstructionFileMapping;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestEmojiInstructionFileMapping(new EmojiComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.Emoji]: options
                    };
                });

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
                                () => fileMapping.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression));
                        });
                });
        });
}
