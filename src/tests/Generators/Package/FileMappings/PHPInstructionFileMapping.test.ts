import { strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { InstructionComponent } from "../../../../Components/InstructionComponent";
import { PHPScriptComponent } from "../../../../generators/package/Components/PHPScriptComponent";
import { PHPInstructionFileMapping } from "../../../../generators/package/FileMappings/PHPInstructionFileMapping";
import { IPHPScriptComponentOptions } from "../../../../generators/package/Settings/IPHPScriptComponentOptions";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link PHPInstructionFileMapping `PHPInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function PHPInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(PHPInstructionFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link PHPInstructionFileMapping `PHPInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestPHPInstructionFileMapping extends PHPInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IPHPScriptComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get Component(): InstructionComponent<IWoltLabSettings, GeneratorOptions, IPHPScriptComponentOptions>
                {
                    return super.Component;
                }

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
            let fileMapping: TestPHPInstructionFileMapping;
            let options: IPHPScriptComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestPHPInstructionFileMapping(new PHPScriptComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        SelfContained: false,
                        Application: "wcf",
                        FileName: "install.php"
                    } as IPHPScriptComponentOptions;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.PHPScript]: options
                    };
                });

            suite(
                nameof<TestPHPInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let applicationProperty = nameof<IPHPInstructionOptions>((options) => options.Application);
                    let fileNameProperty = nameof<IPHPInstructionOptions>((options) => options.FileName);

                    /**
                     * Gets the value of the property with the specified {@link propertyName `propertyName`}.
                     *
                     * @param propertyName
                     * The name of the property whose value to get.
                     *
                     * @returns
                     * The value of the property with the specified {@link propertyName `propertyName`}.
                     */
                    function GetValue(propertyName: string): string
                    {
                        return fileMapping.InstructionOptions.getProperty(propertyName).asKindOrThrow(
                            SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
                    }

                    test(
                        `Checking whether the \`${applicationProperty}\`-property has the correct value…`,
                        () =>
                        {
                            strictEqual(
                                GetValue(applicationProperty),
                                fileMapping.Component.ComponentOptions.Application);
                        });

                    test(
                        `Checking whether the \`${fileNameProperty}\`-property has the correct value…`,
                        () =>
                        {
                            strictEqual(
                                GetValue(fileNameProperty),
                                fileMapping.Component.ComponentOptions.FileName);
                        });
                });
        });
}
