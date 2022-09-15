import { doesNotReject } from "node:assert";
import { GeneratorOptions, GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { FileMappingTester, TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { SourceFile } from "ts-morph";
import { EntryPointFileMapping } from "../../../../generators/package/FileMappings/EntryPointFileMapping.js";
import { WoltLabPackageFileMapping } from "../../../../generators/package/FileMappings/WoltLabPackageFileMapping.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link EntryPointFileMapping `EntryPointFileMapping<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function EntryPointFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(EntryPointFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link EntryPointFileMapping `EntryPointFileMapping<TSettings, TOptions>`} class for testing.
             */
            class TestEntryPointFileMapping extends EntryPointFileMapping<IWoltLabSettings, GeneratorOptions>
            {
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

            let generator: WoltLabPackageGenerator;
            let fileMapping: TestEntryPointFileMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestEntryPointFileMapping>;
            let packageFileMapping: WoltLabPackageFileMapping<IWoltLabSettings, GeneratorOptions>;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    fileMapping = new TestEntryPointFileMapping(generator);
                    packageFileMapping = new WoltLabPackageFileMapping(generator);
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);
                });

            setup(
                async function()
                {
                    this.timeout(10 * 1000);

                    Object.assign<IWoltLabSettings, Partial<IWoltLabSettings>>(
                        generator.Settings,
                        {
                            [TSProjectSettingKey.Name]: "test",
                            [TSProjectSettingKey.DisplayName]: "Test",
                            [TSProjectSettingKey.Description]: "This is a test.",
                            [GeneratorSettingKey.Components]: [],
                            [WoltLabSettingKey.Author]: "John Doe",
                            [WoltLabSettingKey.HomePage]: "https://example.com/",
                            [WoltLabSettingKey.Identifier]: "com.example.test"
                        });

                    await new FileMappingTester(generator, packageFileMapping).Run();
                });

            suite(
                nameof<TestEntryPointFileMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                        });

                    test(
                        "Checking whether the output is valid TypeScript-code…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            await doesNotReject(() => tester.Import());
                        });
                });
        });
}
