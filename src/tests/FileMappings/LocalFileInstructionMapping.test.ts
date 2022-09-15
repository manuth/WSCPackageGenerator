import { doesNotThrow, strictEqual } from "assert";
import { pathToFileURL } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPackageMetadata, Package, PackageType } from "@manuth/package-json-editor";
import { TempDirectory, TempFileSystem } from "@manuth/temp-files";
import { IFileSystemInstructionOptions, SQLInstruction } from "@manuth/woltlab-compiler";
import fs from "fs-extra";
import { ModuleKind, ObjectLiteralExpression, Project, SourceFile } from "ts-morph";
import path from "upath";
import { LocalFileInstructionMapping } from "../../FileMappings/LocalFileInstructionMapping.js";
import { SQLScriptComponent } from "../../generators/package/Components/SQLScriptComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { ILocalComponentOptions } from "../../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

const { writeJSON } = fs;
const { normalize, parse } = path;

/**
 * Registers tests for the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function LocalFileInstructionMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestLocalFileInstructionMapping extends LocalFileInstructionMapping<IWoltLabSettings, GeneratorOptions, ILocalComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }

        /**
         * @inheritdoc
         *
         * @param file
         * The {@link SourceFile `SourceFile`} to transform.
         *
         * @returns
         * The transformed file.
         */
        public override async Transform(file: SourceFile): Promise<SourceFile>
        {
            return super.Transform(file);
        }
    }

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, ILocalComponentOptions, TestLocalFileInstructionMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(LocalFileInstructionMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestLocalFileInstructionMapping
        {
            return new TestLocalFileInstructionMapping(new SQLScriptComponent(this.Generator));
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

            this.Generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                [PackageComponentType.SQLScript]: {
                    ...this.Component.ComponentOptions,
                    Source: this.Generator.destinationPath("assets", "install.sql")
                } as ILocalComponentOptions
            };
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestLocalFileInstructionMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    let self = this;
                    let propertyName = nameof<IFileSystemInstructionOptions>((options) => options.Source);
                    let tempDir: TempDirectory;
                    let scriptFileName: string;

                    setup(
                        async () =>
                        {
                            tempDir = new TempDirectory(
                                {
                                    Directory: this.Generator.destinationPath()
                                });

                            await writeJSON(
                                tempDir.MakePath(Package.FileName),
                                {
                                    type: PackageType.ESModule
                                } as IPackageMetadata);

                            scriptFileName = tempDir.MakePath(
                                TempFileSystem.TempBaseName(
                                    {
                                        Suffix: ".ts"
                                    }));

                            this.Component.ComponentOptions[WoltLabComponentSettingKey.Path] = scriptFileName;
                        });

                    test(
                        `Checking whether a \`${propertyName}\`-property is added…`,
                        () =>
                        {
                            doesNotThrow(() => this.FileMappingOptions.InstructionOptions.getPropertyOrThrow(propertyName));
                        });

                    test(
                        `Checking whether the \`${propertyName}\` points to the specified file…`,
                        async function()
                        {
                            this.slow(5 * 1000);
                            this.timeout(10 * 1000);

                            let project = new Project();
                            let sourceFile: SourceFile;
                            await self.Tester.Run();
                            await self.Tester.DumpFile(scriptFileName, await self.Tester.ParseOutput());
                            sourceFile = project.addSourceFileAtPath(scriptFileName);

                            project.compilerOptions.set(
                                {
                                    module: ModuleKind.ES2022
                                });

                            await sourceFile.emit();

                            let outFile = sourceFile.getEmitOutput().getOutputFiles().find(
                                (outFile) =>
                                {
                                    return parse(outFile.getFilePath()).name === parse(scriptFileName).name;
                                });

                            let sqlInstruction: SQLInstruction = (await import(pathToFileURL(outFile.getFilePath()).toString()))[self.Component.VariableName];

                            strictEqual(
                                normalize(sqlInstruction.Source),
                                normalize(self.Component.ComponentOptions.Source));
                        });
                });

            super.RegisterTests();
        }
    }(context).Register();
}
