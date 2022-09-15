import { ok, strictEqual } from "node:assert";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPackageMetadata, Package, PackageType } from "@manuth/package-json-editor";
import { TempDirectory, TempFile, TempFileSystem } from "@manuth/temp-files";
import fs from "fs-extra";
import { CallExpression, ModuleKind, NewExpression, ObjectLiteralExpression, Project, SourceFile, SyntaxKind, VariableDeclaration } from "ts-morph";
import path from "upath";
import { FileInstructionComponent } from "../../Components/FileInstructionComponent.js";
import { InstructionComponent } from "../../Components/InstructionComponent.js";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping.js";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent.js";
import { BBCodeInstructionFileMapping } from "../../generators/package/FileMappings/BBCodeInstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { InstructionFileMappingSuite } from "../InstructionFileMappingSuite.js";

const { writeJSON } = fs;
const { normalize, parse } = path;

/**
 * Registers tests for the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The text-context.
 */
export function InstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    /**
     * Provides an implementation of the {@link BBCodeInstructionFileMapping `BBCodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestBBCodeFileMapping extends BBCodeInstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return super.InstructionOptions;
        }
    }

    /**
     * Provides an implementation of the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class for testing.
     */
    class TestInstructionFileMapping extends InstructionFileMapping<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
    {
        /**
         * @inheritdoc
         */
        public override get Component(): FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>
        {
            return super.Component as FileInstructionComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>;
        }

        /**
         * @inheritdoc
         */
        public override get InstructionOptions(): ObjectLiteralExpression
        {
            return new TestBBCodeFileMapping(this.Component).InstructionOptions;
        }

        /**
         * @inheritdoc
         *
         * @param sourceFile
         * The file to add the prerequisites to.
         */
        public override ApplyPathJoin(sourceFile: SourceFile): void
        {
            super.ApplyPathJoin(sourceFile);
        }

        /**
         * @inheritdoc
         *
         * @param path
         * The path to point to.
         *
         * @returns
         * Valid TypeScript-code containing a {@link join `join`}-call for pointing to the specified {@link path `path`}.
         */
        public override GetPathJoin(path: string): CallExpression
        {
            return super.GetPathJoin(path);
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

    new class extends InstructionFileMappingSuite<IWoltLabSettings, GeneratorOptions, WoltLabPackageGenerator, IWoltLabComponentOptions, TestInstructionFileMapping>
    {
        /**
         * @inheritdoc
         */
        public get Title(): string
        {
            return nameof(InstructionFileMapping);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The file mapping to test.
         */
        protected CreateFileMapping(): TestInstructionFileMapping
        {
            return new TestInstructionFileMapping(new BBCodeComponent(this.Generator));
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    test(
                        `Checking whether a correct \`${nameof(ObjectLiteralExpression)}\`-instance is returned…`,
                        () =>
                        {
                            ok(this.FileMappingOptions.InstructionOptions instanceof ObjectLiteralExpression);
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.Destination),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<TestInstructionFileMapping>((fm) => fm.Destination)}\` chosen by the user is returned…`,
                        () =>
                        {
                            strictEqual(this.FileMappingOptions.Destination, this.Component.ComponentOptions[WoltLabComponentSettingKey.Path]);
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.ApplyPathJoin),
                () =>
                {
                    test(
                        "Checking whether the expected import is added…",
                        () =>
                        {
                            let file = new Project().createSourceFile("index.ts");
                            this.FileMappingOptions.ApplyPathJoin(file);

                            ok(
                                file.getImportDeclarations().some(
                                    (importDeclaration) =>
                                    {
                                        return importDeclaration.getModuleSpecifierValue() === "path" &&
                                            importDeclaration.getNamedImports().some(
                                                (namedImport) =>
                                                {
                                                    return namedImport.getName() === nameof(join);
                                                });
                                    }));
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.GetPathJoin),
                () =>
                {
                    let self = this;
                    let tempDir: TempDirectory;
                    let scriptFileName: string;
                    let tempFile: TempFile;

                    setup(
                        async () =>
                        {
                            tempDir = new TempDirectory();
                            tempFile = new TempFile();

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

                    teardown(
                        () =>
                        {
                            tempDir.Dispose();
                            tempFile.Dispose();
                        });

                    test(
                        "Checking whether an expression returning a path to the specified file is returned…",
                        async function()
                        {
                            this.slow(5 * 1000);
                            this.timeout(10 * 1000);

                            let project = new Project();
                            let sourceFile = project.createSourceFile(scriptFileName, "");
                            self.FileMappingOptions.ApplyPathJoin(sourceFile);

                            project.compilerOptions.set(
                                {
                                    module: ModuleKind.ES2022
                                });

                            sourceFile.addExportAssignment(
                                {
                                    isExportEquals: false,
                                    expression: self.FileMappingOptions.GetPathJoin(tempFile.FullName).getFullText()
                                });

                            await sourceFile.emit();

                            let outFile = sourceFile.getEmitOutput().getOutputFiles().find(
                                (outputFile) =>
                                {
                                    return parse(scriptFileName).name === parse(outputFile.getFilePath()).name;
                                });

                            let exportValue = (await import(pathToFileURL(outFile.getFilePath()).toString())).default;
                            strictEqual(normalize(exportValue), normalize(tempFile.FullName));
                        });
                });

            super.RegisterTests();
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTransformTests(): void
        {
            super.RegisterTransformTests();

            let sourceFile: SourceFile;

            let getVariableDeclaration = (): VariableDeclaration =>
            {
                return sourceFile.getVariableDeclaration(this.Component.VariableName);
            };

            let getConstructorCall = (): NewExpression =>
            {
                return getVariableDeclaration().getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
            };

            setup(
                async () =>
                {
                    sourceFile = await this.Tester.ParseOutput();
                });

            test(
                "Checking whether all required imports are added…",
                () =>
                {
                    ok(
                        sourceFile.getImportDeclarations().some(
                            (importDeclaration) =>
                            {
                                return importDeclaration.getModuleSpecifierValue() === "@manuth/woltlab-compiler" &&
                                    importDeclaration.getNamedImports().some(
                                        (namedImport) =>
                                        {
                                            return namedImport.getName() === this.Component.ClassName;
                                        });
                            }));
                });

            test(
                `Checking whether a new instance of a class is initialized as indicated by the \`${nameof<InstructionComponent<any, any, any>>((c) => c.ClassName)}\`…`,
                () =>
                {
                    strictEqual(getConstructorCall().getExpressionIfKindOrThrow(SyntaxKind.Identifier).getText(), this.Component.ClassName);
                });

            test(
                `Checking whether the \`${nameof<TestInstructionFileMapping>((fm) => fm.InstructionOptions)}\` are added as a constructor parameter…`,
                async () =>
                {
                    let options = getConstructorCall().getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    strictEqual(options.print(), this.FileMappingOptions.InstructionOptions.print());
                });

            test(
                "Checking whether the exported variable has a documentation comment…",
                async () =>
                {
                    let variableStatement = sourceFile.getVariableStatement(this.Component.VariableName);
                    ok(variableStatement.getJsDocs().length > 0);
                    ok(variableStatement.getJsDocs()[0].getDescription());
                    ok(variableStatement.getJsDocs()[0].getDescription().length > 0);
                });
        }
    }(context).Register();
}
