import { strictEqual } from "assert";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { ICompilationResult, TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { PackageType } from "@manuth/package-json-editor";
import { TempFile } from "@manuth/temp-files";
import { printNode, Project, SourceFile, ts } from "ts-morph";
import path from "upath";
import { WoltLabTypeScriptFileMapping } from "../../FileMappings/WoltLabTypeScriptFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";

const { join, normalize } = path;

/**
 * Registers tests for the {@link WoltLabTypeScriptFileMapping `WoltLabTypeScriptFileMapping<TSettings, TOptions>`} class.
 *
 * @param context
 * The text-context.
 */
export function WoltLabTypeScriptFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabTypeScriptFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabTypeScriptFileMapping `WoltLabTypeScriptFileMapping<TSettings, TOptions>`} class for testing.
             */
            class TestTypeScriptFileMapping extends WoltLabTypeScriptFileMapping<IWoltLabSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 */
                public get Destination(): string
                {
                    return tempFile.FullName;
                }

                /**
                 * @inheritdoc
                 *
                 * @param file
                 * The file to apply the prerequisites to.
                 */
                public override ApplyDirname(file: SourceFile): void
                {
                    super.ApplyDirname(file);
                }

                /**
                 * @inheritdoc
                 *
                 * @returns
                 * A typescript syntax node for determining the name of the directory of the file.
                 */
                public override GetDirname(): ts.Expression
                {
                    return super.GetDirname();
                }
            }

            /**
             * Provides the functionality to test typescript files.
             */
            class FileMappingTester extends TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestTypeScriptFileMapping>
            {
                /**
                 * @inheritdoc
                 *
                 * @param esModule
                 * A value indicating whether the underlying file should be compiled as an ESModule.
                 *
                 * @returns
                 * An object containing information about the compilation.
                 */
                public override Compile(esModule: boolean): Promise<ICompilationResult>
                {
                    return super.Compile(esModule);
                }
            }

            let generator: WoltLabPackageGenerator;
            let fileMapping: TestTypeScriptFileMapping;
            let tester: FileMappingTester;
            let project: Project;
            let tempFile: TempFile;
            let sourceFile: SourceFile;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    fileMapping = new TestTypeScriptFileMapping(generator);
                    tester = new FileMappingTester(generator, fileMapping);
                });

            setup(
                () =>
                {
                    project = new Project();

                    tempFile = new TempFile(
                        {
                            Suffix: ".ts"
                        });

                    sourceFile = project.createSourceFile(
                        tempFile.FullName,
                        undefined,
                        {
                            overwrite: true
                        });
                });

            teardown(
                () =>
                {
                    sourceFile.forget();
                    tempFile.Dispose();
                });

            suite(
                nameof<TestTypeScriptFileMapping>((fileMapping) => fileMapping.ApplyDirname),
                () =>
                {
                    test(
                        `Checking whether the additional \`${nameof(fileURLToPath)}\`-import is added for \`${nameof(PackageType.ESModule)}\` projects…`,
                        () =>
                        {
                            generator.Settings[TSProjectSettingKey.ESModule] = true;
                            fileMapping.ApplyDirname(sourceFile);
                            strictEqual(sourceFile.getImportDeclarations().length, 1);
                        });

                    test(
                        `Checking whether no change is made for \`${nameof(PackageType.CommonJS)}\` projects…`,
                        () =>
                        {
                            let sourceCode = sourceFile.getFullText();
                            generator.Settings[TSProjectSettingKey.ESModule] = false;
                            fileMapping.ApplyDirname(sourceFile);
                            strictEqual(sourceFile.getFullText(), sourceCode);
                        });
                });

            suite(
                nameof<TestTypeScriptFileMapping>((fileMapping) => fileMapping.GetDirname),
                () =>
                {
                    for (let value of [true, false])
                    {
                        let typeName = value ? nameof(PackageType.ESModule) : nameof(PackageType.CommonJS);

                        suite(
                            typeName,
                            () =>
                            {
                                setup(
                                    () =>
                                    {
                                        generator.Settings[TSProjectSettingKey.ESModule] = value;
                                    });

                                test(
                                    "Checking whether a statement is returned which determines the name of the directory containing the output file…",
                                    async () =>
                                    {
                                        fileMapping.ApplyDirname(sourceFile);

                                        sourceFile.addExportAssignment(
                                            {
                                                expression: printNode(fileMapping.GetDirname()),
                                                isExportEquals: !value
                                            });

                                        await tester.DumpOutput(sourceFile);
                                        let compilationResult = await tester.Compile(value);

                                        let exportedValue = value ?
                                            (await import(pathToFileURL(compilationResult.FileName).toString())).default :
                                            createRequire(import.meta.url)(compilationResult.FileName);

                                        let dirName = compilationResult.TempDirectory.FullName;
                                        compilationResult.TempDirectory.Dispose();

                                        strictEqual(
                                            normalize(join(exportedValue, ".")),
                                            normalize(join(dirName, ".")));
                                    });
                            });
                    }
                });
        });
}
