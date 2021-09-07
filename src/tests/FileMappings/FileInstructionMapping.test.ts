import { ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { FileInstructionComponent } from "../../Components/FileInstructionComponent";
import { FileInstructionMapping } from "../../FileMappings/FileInstructionMapping";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link FileInstructionMapping `FileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function FileInstructionMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(FileInstructionMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link FileInstructionMapping `FileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestFileInstructionMapping extends FileInstructionMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get Component(): FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
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
            let fileMapping: TestFileInstructionMapping;

            suiteSetup(
                async function()
                {
                    random = new Random();
                    generator = await context.Generator;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.BBCode]: {
                            [WoltLabComponentSettingKey.Path]: random.string(20)
                        }
                    };

                    fileMapping = new TestFileInstructionMapping(new BBCodeComponent(generator));
                });

            suite(
                nameof<TestFileInstructionMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IInstructionOptions>((o) => o.FileName);

                    test(
                        `Checking whether the \`${propertyName}\` is assigned correctly…`,
                        () =>
                        {
                            let object = fileMapping.InstructionOptions;
                            ok(object.getProperty(propertyName));

                            strictEqual(
                                object.getProperty(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue(),
                                fileMapping.Component.OutputFileName);
                        });
                });
        });
}
