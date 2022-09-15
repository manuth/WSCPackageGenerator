import { strictEqual } from "node:assert";
import { join } from "node:path";
import { AbstractConstructor, GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ApplicationFileSystemInstruction, IApplicationFileSystemInstructionOptions, Instruction } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { FileUploadMapping } from "../../FileMappings/FileUploadMapping.js";
import { FileUploadComponent } from "../../generators/package/Components/FileUploadComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IFileUploadComponentOptions } from "../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

/**
 * Registers tests for the {@link FileUploadMapping `FileUploadMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function FileUploadMappingTests(context: TestContext<WoltLabPackageGenerator>): void
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

    let options: IFileUploadComponentOptions;

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IFileUploadComponentOptions, TestFileUploadMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(FileUploadMapping);
        }

        /**
         * @inheritdoc
         */
        protected override get InstructionClass(): AbstractConstructor<Instruction>
        {
            return ApplicationFileSystemInstruction;
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestFileUploadMapping
        {
            return new TestFileUploadMapping(new FileUploadComponent(this.Generator));
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
                Application: "test",
                Source: join("assets", "files", "test")
            };

            this.Generator.Settings[WoltLabSettingKey.ComponentOptions][PackageComponentType.FileUpload] = options;
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestFileUploadMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let self = this;
                    let propertyName = nameof<IApplicationFileSystemInstructionOptions>((instruction) => instruction.Application);

                    test(
                        `Checking whether a \`${propertyName}\`-property is added with the proper value…`,
                        function()
                        {
                            this.slow(2 * 1000);
                            this.timeout(4 * 1000);

                            strictEqual(
                                self.FileMappingOptions.InstructionOptions.getPropertyOrThrow(propertyName).asKindOrThrow(
                                    SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue(),
                                self.Component.ComponentOptions.Application);
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
