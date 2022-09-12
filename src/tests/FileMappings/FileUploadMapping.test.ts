import { doesNotThrow } from "assert";
import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IApplicationFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { Random } from "random-js";
import { ObjectLiteralExpression } from "ts-morph";
import { FileUploadMapping } from "../../FileMappings/FileUploadMapping.js";
import { SQLScriptComponent } from "../../generators/package/Components/SQLScriptComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IFileUploadComponentOptions } from "../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link FileUploadMapping `FileUploadMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function FileUploadMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(FileUploadMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link FileUploadMapping `FileUploadMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestFileUploadMapping extends FileUploadMapping<IWoltLabSettings, GeneratorOptions, IFileUploadComponentOptions>
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
            let fileMapping: TestFileUploadMapping;
            let options: IFileUploadComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestFileUploadMapping(new SQLScriptComponent(generator));
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        Application: "test",
                        Source: join("assets", "install.sql")
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.SQLScript]: options
                    };
                });

            suite(
                nameof<TestFileUploadMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let propertyName = nameof<IApplicationFileSystemInstructionOptions>((instruction) => instruction.Application);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added…`,
                        function()
                        {
                            this.slow(2 * 1000);
                            this.timeout(4 * 1000);
                            doesNotThrow(() => fileMapping.InstructionOptions.getPropertyOrThrow(propertyName));
                        });
                });
        });
}
