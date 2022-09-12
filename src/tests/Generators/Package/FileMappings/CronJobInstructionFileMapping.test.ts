import { doesNotThrow } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ICronJobInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { CronJobComponent } from "../../../../generators/package/Components/CronJobComponent.js";
import { CronJobInstructionFileMapping } from "../../../../generators/package/FileMappings/CronJobInstructionFileMapping.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link CronJobInstructionFileMapping `CronJobInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function CronJobInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(CronJobInstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestCronJobInstructionFileMapping;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestCronJobInstructionFileMapping(new CronJobComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.CronJob]: options
                    };
                });

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
                                () => fileMapping.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression));
                        });
                });
        });
}
