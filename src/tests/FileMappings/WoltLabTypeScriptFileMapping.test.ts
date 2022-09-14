import { strictEqual } from "assert";
import { fileURLToPath } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { PackageType } from "@manuth/package-json-editor";
import { TempFile } from "@manuth/temp-files";
import { Project, SourceFile, ts } from "ts-morph";
import { WoltLabTypeScriptFileMapping } from "../../FileMappings/WoltLabTypeScriptFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";

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
                    return null;
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

            let generator: WoltLabPackageGenerator;
            let fileMapping: TestTypeScriptFileMapping;
            let project: Project;
            let tempFile: TempFile;
            let sourceFile: SourceFile;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    fileMapping = new TestTypeScriptFileMapping(generator);
                });

            setup(
                () =>
                {
                    project = new Project();
                    tempFile = new TempFile();

                    sourceFile = project.createSourceFile(
                        tempFile.FullName,
                        undefined,
                        {
                            overwrite: true
                        });
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
        });
}
