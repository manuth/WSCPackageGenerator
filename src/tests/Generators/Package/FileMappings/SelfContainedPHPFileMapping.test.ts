import { strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ISelfContainedPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { LocalInstructionComponent } from "../../../../Components/LocalInstructionComponent.js";
import { PHPScriptComponent } from "../../../../generators/package/Components/PHPScriptComponent.js";
import { SelfContainedPHPFileMapping } from "../../../../generators/package/FileMappings/SelfContainedPHPFileMapping.js";
import { IPHPScriptComponentOptions } from "../../../../generators/package/Settings/IPHPScriptComponentOptions.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../../../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link SelfContainedPHPFileMapping `SelfContainedPHPFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function SelfContainedPHPFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    let options: IPHPScriptComponentOptions;

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

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IPHPScriptComponentOptions, TestSelfContainedPHPFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(SelfContainedPHPFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestSelfContainedPHPFileMapping
        {
            return new TestSelfContainedPHPFileMapping(new PHPScriptComponent(this.Generator));
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
                SelfContained: false,
                Application: "wcf",
                Source: this.Generator.assetPath("install.php"),
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
                nameof<TestSelfContainedPHPFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<ISelfContainedPHPInstructionOptions>((options) => options.Destination);

                    test(
                        `Checking whether the \`${propertyName}\`-property has the correct value…`,
                        () =>
                        {
                            strictEqual(
                                this.FileMappingOptions.InstructionOptions.getProperty(propertyName).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(
                                    SyntaxKind.StringLiteral).getLiteralValue(),
                                this.FileMappingOptions.Component.ComponentOptions.FileName);
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
