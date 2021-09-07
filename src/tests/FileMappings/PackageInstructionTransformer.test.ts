import { doesNotReject, ok } from "assert";
import { GeneratorOptions, GeneratorSettingKey, IFileMapping } from "@manuth/extended-yo-generator";
import { FileMappingTester, TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IInstructionSetOptions, IPackageOptions } from "@manuth/woltlab-compiler";
import mock = require("mock-require");
import { Random } from "random-js";
import { SourceFile, SyntaxKind } from "ts-morph";
import { PackageInstructionTransformer } from "../../FileMappings/PackageInstructionTransformer";
import { BBCodeComponent } from "../../generators/package/Components/BBCodeComponent";
import { WoltLabPackageFileMapping } from "../../generators/package/FileMappings/WoltLabPackageFileMapping";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link PackageInstructionTransformer `PackageInstructionTransformer<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function PackageInstructionTransformerTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(PackageInstructionTransformer),
        () =>
        {
            let random: Random;
            let generator: WoltLabPackageGenerator;
            let transformer: PackageInstructionTransformer<IWoltLabSettings, GeneratorOptions>;
            let packageFileMapping: WoltLabPackageFileMapping<IWoltLabSettings, GeneratorOptions>;
            let packageFileTester: TypeScriptFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, IFileMapping<IWoltLabSettings, GeneratorOptions>>;
            let component: BBCodeComponent<IWoltLabSettings, GeneratorOptions, IWoltLabComponentOptions>;
            let options: IWoltLabComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    packageFileMapping = new WoltLabPackageFileMapping(generator);
                    packageFileTester = new TypeScriptFileMappingTester(generator, packageFileMapping);
                    component = new BBCodeComponent(generator);
                    transformer = new PackageInstructionTransformer(component);
                });

            setup(
                async function()
                {
                    this.timeout(20 * 1000);

                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`
                    };

                    Object.assign<IWoltLabSettings, Partial<IWoltLabSettings>>(
                        generator.Settings,
                        {
                            [TSProjectSettingKey.Name]: "test",
                            [TSProjectSettingKey.DisplayName]: "Test",
                            [TSProjectSettingKey.Description]: "This is a test.",
                            [GeneratorSettingKey.Components]: [],
                            [WoltLabSettingKey.Author]: "John Doe",
                            [WoltLabSettingKey.Identifier]: "com.example.test",
                            [WoltLabSettingKey.HomePage]: "https://example.com/",
                            [WoltLabSettingKey.ComponentOptions]: {
                                [PackageComponentType.BBCode]: options
                            }
                        });

                    for (let fileMapping of component.FileMappings)
                    {
                        await new FileMappingTester(generator, fileMapping).Run();
                    }

                    await packageFileTester.Run();
                });

            suite(
                nameof<PackageInstructionTransformer<any, any>>((transformer) => transformer.Transform),
                () =>
                {
                    let file: SourceFile;
                    let compilerPackageName: string;

                    suiteSetup(
                        () =>
                        {
                            compilerPackageName = "@manuth/woltlab-compiler";
                        });

                    setup(
                        async function()
                        {
                            this.timeout(10 * 1000);
                            file = await packageFileTester.ParseOutput();
                            transformer.Transform(file);
                            await packageFileTester.DumpOutput(file);
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            mock(compilerPackageName, require(compilerPackageName));
                        });

                    teardown(
                        () =>
                        {
                            mock.stop(compilerPackageName);
                        });

                    test(
                        "Checking whether instructions are injected correctly…",
                        async () =>
                        {
                            ok(
                                file.getImportDeclarations().some(
                                    (importDeclaration) =>
                                    {
                                        return importDeclaration.getNamedImports().some(
                                            (importSpecifier) =>
                                            {
                                                return importSpecifier.getName() === component.VariableName;
                                            });
                                    }));

                            let packageOptions = file.getVariableDeclaration(
                                generator.PackageVariableName).getInitializerIfKindOrThrow(
                                    SyntaxKind.NewExpression).getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

                            let instructions = packageOptions.getProperty(nameof<IPackageOptions>((options) => options.InstallSet)).asKindOrThrow(
                                SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression).getProperty(
                                    nameof<IInstructionSetOptions>((options) => options.Instructions)).asKindOrThrow(
                                        SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

                            ok(
                                instructions.getElements().some(
                                    (element) =>
                                    {
                                        return element.asKind(SyntaxKind.Identifier)?.getText() === component.VariableName;
                                    }));
                        });

                    test(
                        "Checking whether the resulting file contains valid TypeScript-code…",
                        async function()
                        {
                            this.slow(15 * 1000);
                            this.timeout(30 * 1000);
                            await doesNotReject(() => packageFileTester.Require());
                        });
                });
        });
}
