import { doesNotReject, doesNotThrow, ok, strictEqual, throws } from "node:assert";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { GeneratorOptions, GeneratorSettingKey, IFileMapping, IGeneratorSettings } from "@manuth/extended-yo-generator";
import { FileMappingTester, TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";
import { IInstructionSetOptions, InvariantCultureName, IPackageOptions, Package } from "@manuth/woltlab-compiler";
import npmWhich from "npm-which";
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import { ArrayLiteralExpression, NewExpression, ObjectLiteralExpression, printNode, SourceFile, SyntaxKind, ts } from "ts-morph";
import path from "upath";
import { BBCodeComponent } from "../../../../generators/package/Components/BBCodeComponent.js";
import { WoltLabPackageFileMapping } from "../../../../generators/package/FileMappings/WoltLabPackageFileMapping.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { BBCodeInstructionFileMapping, InstructionComponent } from "../../../../index.js";
import { IWoltLabComponentOptions } from "../../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

const { normalize } = path;

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
                 * The file to register the specified {@link component `component`} to.
                 *
                 * @param component
                 * The component to register.
                 */
                public override async AddComponent(file: SourceFile, component: InstructionComponent<IWoltLabSettings, GeneratorOptions, any>): Promise<void>
                {
                    return super.AddComponent(file, component);
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
            let sourceFile: SourceFile;

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

                    await tester.Run();
                    sourceFile = await tester.ParseOutput();
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
                nameof<TestWoltLabPackageFileMapping>((fileMapping) => fileMapping.AddComponent),
                () =>
                {
                    let getConstructorCall = (): NewExpression =>
                    {
                        return sourceFile.getVariableDeclaration(generator.PackageVariableName).getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
                    };

                    let getPackageOptions = (): ObjectLiteralExpression =>
                    {
                        return getConstructorCall().getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    };

                    let getInstallSet = (): ObjectLiteralExpression =>
                    {
                        return getPackageOptions().getProperty(installSetKey).asKindOrThrow(
                            SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    };

                    let getInstructions = (): ArrayLiteralExpression =>
                    {
                        return getInstallSet().getProperty(instructionKey).asKindOrThrow(
                            SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
                    };

                    let installSetKey: string;
                    let instructionKey: string;

                    suiteSetup(
                        () =>
                        {
                            installSetKey = nameof<IPackageOptions>((pkg) => pkg.InstallSet);
                            instructionKey = nameof<IPackageOptions>((pkg) => pkg.InstallSet.Instructions);
                        });

                    setup(
                        async () =>
                        {
                            await new FileMappingTester(generator, new BBCodeInstructionFileMapping(component)).Run();
                            generator.Settings[GeneratorSettingKey.Components] = [];
                            await tester.Run();
                            sourceFile = await tester.ParseOutput();
                        });

                    test(
                        "Checking whether an import for the instruction is added…",
                        async function()
                        {
                            this.slow(10 * 1000);
                            this.timeout(20 * 1000);

                            let componentFilePath = generator.destinationPath(component.ComponentOptions[WoltLabComponentSettingKey.Path]);
                            await fileMapping.AddComponent(sourceFile, component);

                            ok(
                                sourceFile.getImportDeclarations().some(
                                    (importDeclaration) =>
                                    {
                                        let filePath = importDeclaration.getModuleSpecifierSourceFile()?.getFilePath() ?? "";

                                        return normalize(filePath) === normalize(componentFilePath) &&
                                            importDeclaration.getNamedImports().some(
                                                (namedImport) =>
                                                {
                                                    return namedImport.getName() === component.VariableName;
                                                });
                                    }));
                        });

                    test(
                        `Checking whether the \`${nameof<IPackageOptions>((p) => p.InstallSet)}\` is recreated automatically if it doesn't exist or if it has an incorrect type…`,
                        async function()
                        {
                            this.slow(0.5 * 60 * 1000);
                            this.timeout(1 * 60 * 1000);

                            for (
                                let action of
                                [
                                    () => getPackageOptions().getProperty(installSetKey)?.remove(),
                                    () =>
                                    {
                                        getPackageOptions().getProperty(installSetKey)?.remove();

                                        getPackageOptions().addPropertyAssignment(
                                            {
                                                name: installSetKey,
                                                initializer: printNode(ts.factory.createStringLiteral(""))
                                            });
                                    }
                                ])
                            {
                                action();
                                throws(() => getInstallSet());
                                await fileMapping.AddComponent(sourceFile, component);
                                doesNotThrow(() => getInstallSet());
                            }
                        });

                    test(
                        `Checking whether the \`${nameof<IPackageOptions>((p) => p.InstallSet.Instructions)}\` is recreated automatically if it doesn't exist or if it has an incorrect type…`,
                        async function()
                        {
                            this.slow(0.5 * 60 * 1000);
                            this.timeout(1 * 60 * 1000);

                            for (
                                let action of
                                [
                                    () => getInstallSet().getProperty(instructionKey)?.remove(),
                                    () =>
                                    {
                                        getInstallSet().getProperty(instructionKey)?.remove();

                                        getInstallSet().addPropertyAssignment(
                                            {
                                                name: instructionKey,
                                                initializer: printNode(ts.factory.createStringLiteral(""))
                                            });
                                    }
                                ])
                            {
                                action();
                                throws(() => getInstructions());
                                await fileMapping.AddComponent(sourceFile, component);
                                doesNotThrow(() => getInstructions());
                            }
                        });

                    test(
                        "Checking whether the instruction is added to the install set…",
                        async function()
                        {
                            this.slow(0.5 * 60 * 1000);
                            this.timeout(1 * 60 * 1000);

                            let getPackage = async (): Promise<Package> => (await tester.Import())[generator.PackageVariableName] as Package;
                            strictEqual(getInstructions().getElements().length, 0);
                            let $package = await getPackage();
                            strictEqual($package.InstallSet.length, 0);

                            await fileMapping.AddComponent(sourceFile, component);
                            await tester.DumpOutput(sourceFile);
                            $package = await getPackage();
                            strictEqual(getInstructions().getElements().length, 1);
                            strictEqual($package.InstallSet.length, 1);
                            strictEqual($package.InstallSet[0].constructor.name, component.ClassName);
                        });
                });

            suite(
                nameof<TestWoltLabPackageFileMapping>((fileMapping) => fileMapping.Transform),
                () =>
                {
                    setup(
                        async function()
                        {
                            this.timeout(30 * 1000);
                            await tester.DumpOutput(await fileMapping.Transform(await fileMapping.GetSourceObject()));
                            sourceFile = await tester.ParseOutput();
                        });

                    test(
                        "Checking whether the generated code is valid…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            await doesNotReject(() => tester.Import());
                        });

                    test(
                        "Checking whether the package inside the code looks as expected…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            let $package: Package = (await tester.Import())[generator.PackageVariableName];
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
                            strictEqual($package.ConflictingPackages.length, 1);
                            strictEqual($package.ConflictingPackages[0].Identifier, "com.woltlab.wcf");
                            strictEqual($package.ConflictingPackages[0].Version, "6.0.0 Alpha 1");
                        });

                    test(
                        "Checking whether a JSDoc comment is added to the exported variable…",
                        async () =>
                        {
                            let docComments = sourceFile.getVariableStatement(generator.PackageVariableName).getJsDocs();
                            strictEqual(docComments.length, 1);
                            ok(docComments[0].getDescription());
                            ok(docComments[0].getDescription().trim().length > 0);
                        });

                    test(
                        "Checking whether the instructions of the enabled components are added…",
                        async function()
                        {
                            this.slow(20 * 1000);
                            this.timeout(40 * 1000);
                            let packageVariable = sourceFile.getVariableDeclaration(generator.PackageVariableName).getInitializerIfKindOrThrow(
                                SyntaxKind.NewExpression).getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

                            let instructions = packageVariable.getProperty(nameof<Package>((pkg) => pkg.InstallSet)).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(
                                SyntaxKind.ObjectLiteralExpression).getProperty(nameof<IInstructionSetOptions>((o) => o.Instructions)).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

                            strictEqual(instructions.getElements().length, 1);
                            strictEqual(instructions.getElements()[0].asKindOrThrow(SyntaxKind.Identifier).getText(), component.VariableName);
                        });
                });
        });
}
