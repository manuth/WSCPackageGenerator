import { doesNotReject, strictEqual } from "assert";
import { GeneratorOptions, GeneratorSettingKey, IFileMapping, IGeneratorSettings } from "@manuth/extended-yo-generator";
import { FileMappingTester, TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IInstructionSetOptions, InvariantCultureName, Package } from "@manuth/woltlab-compiler";
import mock = require("mock-require");
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import { SourceFile, SyntaxKind } from "ts-morph";
import { BBCodeComponent } from "../../../../generators/package/Components/BBCodeComponent";
import { WoltLabPackageFileMapping } from "../../../../generators/package/FileMappings/WoltLabPackageFileMapping";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link WoltLabPackageFileMapping `WoltLabPackageFileMapping<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function WoltLabPackageFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabPackageFileMapping),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabPackageFileMapping `WoltLabPackageFileMapping<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabPackageFileMapping extends WoltLabPackageFileMapping<IWoltLabSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get CreationDate(): string
                {
                    return super.CreationDate;
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
            let fileMapping: TestWoltLabPackageFileMapping;
            let tester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, TestWoltLabPackageFileMapping>;
            let component: BBCodeComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>;
            let sandbox: SinonSandbox;
            let date: string;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    fileMapping = new TestWoltLabPackageFileMapping(generator);
                    tester = new TypeScriptFileMappingTester(generator, fileMapping);
                    component = new BBCodeComponent(generator);
                    sandbox = createSandbox();
                    date = "1958-10-25";
                });

            setup(
                async function()
                {
                    this.timeout(1 * 60 * 1000);

                    Object.assign<IWoltLabSettings, Partial<IWoltLabSettings>>(
                        generator.Settings,
                        {
                            [TSProjectSettingKey.Name]: "awesome",
                            [TSProjectSettingKey.DisplayName]: "Awesome",
                            [WoltLabSettingKey.Identifier]: "com.terra.games.awesome",
                            [WoltLabSettingKey.Author]: "John Doe",
                            [WoltLabSettingKey.HomePage]: "https://games.terra.com/awesome",
                            [TSProjectSettingKey.Description]: "An awesome game!",
                            [GeneratorSettingKey.Components]: [
                                PackageComponentType.BBCode
                            ],
                            [WoltLabSettingKey.ComponentOptions]: {
                                [PackageComponentType.BBCode]: {
                                    [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                                }
                            }
                        });

                    for (let fileMapping of component.FileMappings)
                    {
                        await new FileMappingTester(generator, fileMapping as IFileMapping<IGeneratorSettings, GeneratorOptions>).Run();
                    }

                    sandbox.useFakeTimers(
                        {
                            now: new Date(date),
                            shouldAdvanceTime: true
                        });
                });

            teardown(
                () =>
                {
                    sandbox.restore();
                });

            suite(
                nameof<TestWoltLabPackageFileMapping>((fileMapping) => fileMapping.CreationDate),
                () =>
                {
                    test(
                        "Checking whether the date is created correctly…",
                        () =>
                        {
                            strictEqual(fileMapping.CreationDate, date);
                        });
                });

            suite(
                nameof<TestWoltLabPackageFileMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    let packageName: string;

                    suiteSetup(
                        () =>
                        {
                            packageName = "@manuth/woltlab-compiler";
                        });

                    setup(
                        async function()
                        {
                            this.timeout(30 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            mock(packageName, require(packageName));
                        });

                    teardown(
                        () =>
                        {
                            mock.stop(packageName);
                        });

                    test(
                        "Checking whether the generated code is valid…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            await doesNotReject(() => tester.Require());
                        });

                    test(
                        "Checking whether the package inside the code looks as expected…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            let $package: Package = (await tester.Require())[generator.PackageVariableName];
                            strictEqual($package.DisplayName.Data.get(InvariantCultureName), generator.Settings[TSProjectSettingKey.DisplayName]);
                            strictEqual($package.Identifier, generator.Settings[WoltLabSettingKey.Identifier]);
                            strictEqual($package.Version, "0.0.0");
                            strictEqual($package.Author.Name, generator.Settings[WoltLabSettingKey.Author]);
                            strictEqual($package.Author.URL, generator.Settings[WoltLabSettingKey.HomePage]);
                            strictEqual($package.License, null);
                            strictEqual($package.CreationDate.getTime(), new Date(date).getTime());
                            strictEqual($package.Description.Data.get(InvariantCultureName), generator.Settings[TSProjectSettingKey.Description]);
                            strictEqual($package.RequiredPackages.length, 1);
                            strictEqual($package.RequiredPackages[0].Identifier, "com.woltlab.wcf");
                            strictEqual($package.RequiredPackages[0].MinVersion, "3.0.0");
                        });

                    test(
                        "Checking whether the instructions of the enabled components are added…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            let file = await tester.ParseOutput();
                            let packageVariable = file.getVariableDeclaration(generator.PackageVariableName).getInitializerIfKindOrThrow(
                                SyntaxKind.NewExpression).getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

                            let instructions = packageVariable.getProperty(nameof<Package>((pkg) => pkg.InstallSet)).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(
                                SyntaxKind.ObjectLiteralExpression).getProperty(nameof<IInstructionSetOptions>((o) => o.Instructions)).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

                            strictEqual(instructions.getElements().length, 1);
                            strictEqual(instructions.getElements()[0].asKindOrThrow(SyntaxKind.Identifier).getText(), component.VariableName);
                        });
                });
        });
}
