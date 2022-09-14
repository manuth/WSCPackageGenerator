import { doesNotReject, ok, strictEqual } from "assert";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import npmWhich from "npm-which";
import { Random } from "random-js";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { FileInstructionComponent } from "../../Components/FileInstructionComponent.js";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping.js";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent.js";
import { BBCodeInstructionFileMapping } from "../../generators/package/FileMappings/BBCodeInstructionFileMapping.js";
import { IThemeComponentOptions } from "../../generators/package/Settings/IThemeComponentOptions.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The text-context.
 */
export function InstructionFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(InstructionFileMapping),
        () =>
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

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let fileMapping: TestInstructionFileMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestInstructionFileMapping>;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestInstructionFileMapping(new BBCodeComponent(generator));
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);

                    spawnSync(
                        npmWhich(fileURLToPath(new URL(".", import.meta.url))).sync("npm"),
                        [
                            "install",
                            "--silent"
                        ],
                        {
                            cwd: generator.destinationPath(),
                            stdio: "ignore"
                        });
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                    } as IThemeComponentOptions;

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.BBCode]: options
                    };
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.InstructionOptions),
                () =>
                {
                    test(
                        `Checking whether a correct \`${nameof(ObjectLiteralExpression)}\`-instance is returned…`,
                        () =>
                        {
                            ok(fileMapping.InstructionOptions instanceof ObjectLiteralExpression);
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
                            strictEqual(fileMapping.Destination, options[WoltLabComponentSettingKey.Path]);
                        });
                });

            suite(
                nameof<TestInstructionFileMapping>((fileMapping) => fileMapping.Transform),
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
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            await doesNotReject(() => tester.Import());
                        });
                });
        });
}
