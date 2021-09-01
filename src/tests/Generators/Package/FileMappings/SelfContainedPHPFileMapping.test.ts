import { strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ISelfContainedPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { LocalInstructionComponent } from "../../../../Components/LocalInstructionComponent";
import { PHPScriptComponent } from "../../../../generators/package/Components/PHPScriptComponent";
import { SelfContainedPHPFileMapping } from "../../../../generators/package/FileMappings/SelfContainedPHPFileMapping";
import { IPHPScriptComponentOptions } from "../../../../generators/package/Settings/IPHPScriptComponentOptions";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../../../../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link SelfContainedPHPFileMapping `SelfContainedPHPFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function SelfContainedPHPFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(SelfContainedPHPFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link SelfContainedPHPFileMapping `SelfContainedPHPFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestSelfContainedPHPFileMapping extends SelfContainedPHPFileMapping<IWoltLabSettings, GeneratorOptions, IPHPScriptComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get Component(): LocalInstructionComponent<IWoltLabSettings, GeneratorOptions, IPHPScriptComponentOptions>
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
            let fileMapping: TestSelfContainedPHPFileMapping;
            let options: IPHPScriptComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestSelfContainedPHPFileMapping(new PHPScriptComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentKey.Path]: `${random.string(20)}.ts`,
                        SelfContained: false,
                        Application: "wcf",
                        Source: generator.assetPath("install.php"),
                        FileName: "install.php"
                    } as IPHPScriptComponentOptions;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.PHPScript]: options
                    };
                });

            suite(
                nameof<TestSelfContainedPHPFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<ISelfContainedPHPInstructionOptions>((options) => options.Destination);

                    test(
                        `Checking whether the \`${propertyName}\`-property has the correct value…`,
                        () =>
                        {
                            strictEqual(
                                fileMapping.InstructionOptions.getProperty(propertyName).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(
                                    SyntaxKind.StringLiteral).getLiteralValue(),
                                fileMapping.Component.ComponentOptions.FileName);
                        });
                });
        });
}