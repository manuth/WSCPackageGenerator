import { ok, strictEqual } from "assert";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { CallExpression, NewExpression, ObjectLiteralExpression, Project, SourceFile, SyntaxKind, VariableDeclaration } from "ts-morph";
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
                                        return importDeclaration.getModuleSpecifier().getLiteralValue() === "path" &&
                                            importDeclaration.getNamedImports().some(
                                                (namedImport) =>
                                                {
                                                    return namedImport.getName() === nameof(join);
                                                });
                                    }));
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
