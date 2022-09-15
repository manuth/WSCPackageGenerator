import { strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { InstructionComponent } from "../../../../Components/InstructionComponent.js";
import { PHPScriptComponent } from "../../../../generators/package/Components/PHPScriptComponent.js";
import { PHPInstructionFileMapping } from "../../../../generators/package/FileMappings/PHPInstructionFileMapping.js";
import { IPHPScriptComponentOptions } from "../../../../generators/package/Settings/IPHPScriptComponentOptions.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../../../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link PHPInstructionFileMapping `PHPInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function PHPInstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
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

    let options: IPHPScriptComponentOptions;

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IPHPScriptComponentOptions, TestPHPInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(PHPInstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestPHPInstructionFileMapping
        {
            return new TestPHPInstructionFileMapping(new PHPScriptComponent(this.Generator));
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

            options = {
                ...this.Component.ComponentOptions,
                Application: "wcf",
                FileName: "install.php"
            };

            this.Generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                [PackageComponentType.PHPScript]: options
            };
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestPHPInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let fileMapping: TestPHPInstructionFileMapping;
                    let applicationProperty: string;
                    let fileNameProperty: string;

                    suiteSetup(
                        () =>
                        {
                            fileMapping = this.FileMappingOptions;
                            applicationProperty = nameof<IPHPInstructionOptions>((options) => options.Application);
                            fileNameProperty = nameof<IPHPInstructionOptions>((options) => options.FileName);
                        });

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

            super.RegisterTests();
        }
    }(context).Register();
}
