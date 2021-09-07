import { doesNotReject } from "assert";
import { GeneratorOptions, GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { FileMappingTester, TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import mock = require("mock-require");
import { SourceFile } from "ts-morph";
import { EntryPointFileMapping } from "../../../../generators/package/FileMappings/EntryPointFileMapping";
import { WoltLabPackageFileMapping } from "../../../../generators/package/FileMappings/WoltLabPackageFileMapping";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

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
                    let packageNames: string[];

                    suiteSetup(
                        () =>
                        {
                            packageNames = [
                                "@manuth/woltlab-compiler",
                                "path"
                            ];
                        });

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));

                            for (let packageName of packageNames)
                            {
                                // eslint-disable-next-line @typescript-eslint/no-var-requires
                                mock(packageName, require(packageName));
                            }
                        });

                    teardown(
                        () =>
                        {
                            for (let packageName of packageNames)
                            {
                                mock.stop(packageName);
                            }
                        });

                    test(
                        "Checking whether the output is valid TypeScript-code…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            await doesNotReject(() => tester.Require());
                        });
                });
        });
}
