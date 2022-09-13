import { EOL } from "os";
import { GeneratorOptions, GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import type * as compiler from "@manuth/woltlab-compiler";
import { ArrayLiteralExpression, NewExpression, ObjectLiteralExpression, printNode, SourceFile, SyntaxKind, ts, VariableDeclarationKind } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent.js";
import { WoltLabTypeScriptFileMapping } from "../../../FileMappings/WoltLabTypeScriptFileMapping.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey.js";
import { WoltLabPackageGenerator } from "../WoltLabPackageGenerator.js";

/**
 * The `@manuth/woltlab-compiler` package.
 */
type WoltLabCompiler = typeof compiler;

/**
 * Provides the functionality to generate a package-file.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class WoltLabPackageFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends WoltLabTypeScriptFileMapping<TSettings, TOptions>
{
    /**
     * The generator of the file-mapping.
     */
    private packageGenerator: WoltLabPackageGenerator<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabPackageFileMapping `WoltLabPackageFileMapping<TSettings, TOptions>`} class.
     *
     * @param generator
     * The component to create an instruction-file for.
     */
    public constructor(generator: WoltLabPackageGenerator<TSettings, TOptions>)
    {
        super(generator);
        this.packageGenerator = generator;
    }

    /**
     * @inheritdoc
     */
    public override get Generator(): WoltLabPackageGenerator<TSettings, TOptions>
    {
        return this.packageGenerator;
    }

    /**
     * @inheritdoc
     */
    public get Destination(): string
    {
        return this.Generator.sourcePath(`${this.Generator.PackageVariableName}.ts`);
    }

    /**
     * Gets the creation-date for the package-metadata.
     */
    protected get CreationDate(): string
    {
        let date = new Date();
        return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
    }

    /**
     * Gets options to pass to the constructor of the {@link RequiredPackageDescriptor `RequiredPackageDescriptor`} class.
     */
    protected get RequiredPackageOptions(): ObjectLiteralExpression
    {
        let options = this.GetObjectLiteral();

        options.addPropertyAssignments(
            [
                {
                    name: nameof<compiler.IRequiredPackageDescriptorOptions>((options) => options.Identifier),
                    initializer: printNode(ts.factory.createStringLiteral("com.woltlab.wcf"))
                },
                {
                    name: nameof<compiler.IRequiredPackageDescriptorOptions>((options) => options.MinVersion),
                    initializer: printNode(ts.factory.createStringLiteral("3.0.0"))
                }
            ]);

        return options;
    }

    /**
     * Gets a constructor-call of the {@link RequiredPackageDescriptor `RequiredPackageDescriptor`} class.
     */
    protected get RequiredPackageConstructor(): NewExpression
    {
        let constructor = this.GetConstructorCall(nameof<compiler.RequiredPackageDescriptor>());
        constructor.addArgument(`${EOL}${this.RequiredPackageOptions.getFullText()}`);
        return constructor;
    }

    /**
     * Gets options to pass to the constructor of the {@link ConflictingPackageDescriptor `ConflictingPackageDescriptor`} class.
     */
    protected get ConflictingPackageOptions(): ObjectLiteralExpression
    {
        let options = this.GetObjectLiteral();

        options.addPropertyAssignments(
            [
                {
                    name: nameof<compiler.IConflictingPackageDescriptorOptions>((options) => options.Identifier),
                    initializer: printNode(ts.factory.createStringLiteral("com.woltlab.wcf"))
                },
                {
                    name: nameof<compiler.IConflictingPackageDescriptorOptions>((options) => options.Version),
                    initializer: printNode(ts.factory.createStringLiteral("6.0.0 Alpha 1"))
                }
            ]);

        return options;
    }

    /**
     * Gets a constructor-call of the {@link ConflictingPackageDescriptor `ConflictingPackageDescriptor`} class.
     */
    protected get ConflictingPackageConstructor(): NewExpression
    {
        let constructor = this.GetConstructorCall(nameof<compiler.ConflictingPackageDescriptor>());
        constructor.addArgument(`${EOL}${this.ConflictingPackageOptions.getFullText()}`);
        return constructor;
    }

    /**
     * Gets the options to pass to the package-constructor.
     */
    protected get PackageOptions(): ObjectLiteralExpression
    {
        let options = this.GetObjectLiteral();
        let displayName = this.GetObjectLiteral();
        let author = this.GetObjectLiteral();
        let description = this.GetObjectLiteral();
        let installSet = this.GetObjectLiteral();
        let requiredPackages = this.GetArrayLiteral();
        let conflictingPackages = this.GetArrayLiteral();

        displayName.addPropertyAssignment(
            {
                name: printNode(
                    ts.factory.createComputedPropertyName(ts.factory.createIdentifier(nameof<WoltLabCompiler>((compiler) => compiler.InvariantCultureName)))),
                initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[TSProjectSettingKey.DisplayName] ?? ""))
            });

        author.addPropertyAssignments(
            [
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Author.Name),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.Author] ?? ""))
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Author.URL),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.HomePage] ?? ""))
                }
            ]);

        description.addPropertyAssignment(
            {
                name: printNode(ts.factory.createComputedPropertyName(ts.factory.createIdentifier(nameof<WoltLabCompiler>((compiler) => compiler.InvariantCultureName)))),
                initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[TSProjectSettingKey.Description] ?? ""))
            });

        installSet.addPropertyAssignment(
            {
                name: nameof<compiler.IPackageOptions>((options) => options.InstallSet.Instructions),
                initializer: printNode(ts.factory.createArrayLiteralExpression())
            });

        requiredPackages.addElement(`${EOL}${this.RequiredPackageConstructor.getFullText()}${EOL}`);
        conflictingPackages.addElement(`${EOL}${this.ConflictingPackageConstructor.getFullText()}${EOL}`);

        options.addPropertyAssignments(
            [
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Identifier),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.Identifier] ?? ""))
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.DisplayName),
                    initializer: displayName.getFullText()
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Version),
                    initializer: printNode(ts.factory.createStringLiteral("0.0.0"))
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Author),
                    initializer: author.getFullText()
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.License),
                    initializer: printNode(ts.factory.createNull())
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.CreationDate),
                    initializer: printNode(
                        ts.factory.createNewExpression(
                            ts.factory.createIdentifier(nameof<Date>()),
                            [],
                            [
                                ts.factory.createStringLiteral(this.CreationDate)
                            ]))
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.Description),
                    initializer: description.getFullText()
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.InstallSet),
                    initializer: installSet.getFullText()
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.RequiredPackages),
                    initializer: requiredPackages.getFullText()
                },
                {
                    name: nameof<compiler.IPackageOptions>((options) => options.ConflictingPackages),
                    initializer: conflictingPackages.getFullText()
                }
            ]);

        return options;
    }

    /**
     * Gets an {@link ObjectLiteralExpression `ObjectLiteralExpression`}-node.
     *
     * @returns
     * The newly created {@link ObjectLiteralExpression `ObjectLiteralExpression`}.
     */
    protected GetObjectLiteral(): ObjectLiteralExpression
    {
        return this.WrapNode(ts.factory.createParenthesizedExpression(ts.factory.createObjectLiteralExpression())).getExpressionIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
    }

    /**
     * Gets a constructor-call.
     *
     * @param className
     * The name of the class to create a constructor for.
     *
     * @returns
     * The newly created constructor-call.
     */
    protected GetConstructorCall(className: string): NewExpression
    {
        return this.WrapNode(ts.factory.createNewExpression(ts.factory.createIdentifier(className), [], []));
    }

    /**
     * Gets an {@link ArrayLiteralExpression `ArrayLiteralExpression`}-node.
     *
     * @returns
     * The newly created {@link ArrayLiteralExpression `ArrayLiteralExpression`}.
     */
    protected GetArrayLiteral(): ArrayLiteralExpression
    {
        return this.WrapNode(ts.factory.createArrayLiteralExpression());
    }

    /**
     * Registers the specified {@link component `component`}.
     *
     * @param file
     * The file to register the specified {@link component `component`} to.
     *
     * @param component
     * The component to register.
     */
    protected async AddComponent(file: SourceFile, component: InstructionComponent<TSettings, TOptions, any>): Promise<void>
    {
        let packageOptions: ObjectLiteralExpression;
        let installSet: ObjectLiteralExpression;
        let installInstructions: ArrayLiteralExpression;
        let installSetKey = nameof<compiler.IPackageOptions>((options) => options.InstallSet);
        let installInstructionKey = nameof<compiler.IPackageOptions>((options) => options.InstallSet.Instructions);

        file.addImportDeclaration(
            {
                ...await this.GetImportDeclaration(component.ComponentOptions[WoltLabComponentSettingKey.Path]),
                namedImports: [
                    component.VariableName
                ]
            });

        packageOptions = file.getVariableDeclaration(
            this.Generator.PackageVariableName
        ).getInitializerIfKindOrThrow(
            SyntaxKind.NewExpression
        ).getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

        try
        {
            installSet = packageOptions.getProperty(installSetKey).asKindOrThrow(
                SyntaxKind.PropertyAssignment
            ).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        }
        catch
        {
            packageOptions.getProperty(installSetKey)?.remove();

            installSet = packageOptions.addPropertyAssignment(
                {
                    name: installSetKey,
                    initializer: printNode(ts.factory.createObjectLiteralExpression())
                }).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        }

        try
        {
            installInstructions = installSet.getProperty(installInstructionKey).asKindOrThrow(
                SyntaxKind.PropertyAssignment
            ).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        }
        catch
        {
            installSet.getProperty(installInstructionKey)?.remove();

            installInstructions = installSet.addPropertyAssignment(
                {
                    name: installInstructionKey,
                    initializer: printNode(ts.factory.createArrayLiteralExpression())
                }).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        }

        let prefix = installInstructions.getElements().length === 0 ? EOL : "";
        installInstructions.addElement(prefix + printNode(ts.factory.createIdentifier(component.VariableName)) + EOL);
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
    protected override async Transform(file: SourceFile): Promise<SourceFile>
    {
        file = await super.Transform(file);

        file.addImportDeclaration(
            {
                moduleSpecifier: "@manuth/woltlab-compiler",
                namedImports: [
                    {
                        name: nameof<compiler.ConflictingPackageDescriptor>()
                    },
                    {
                        name: nameof<WoltLabCompiler>((compiler) => compiler.InvariantCultureName)
                    },
                    {
                        name: nameof<compiler.Package>()
                    },
                    {
                        name: nameof<compiler.RequiredPackageDescriptor>()
                    }
                ]
            });

        let constructor = this.WrapNode(ts.factory.createNewExpression(ts.factory.createIdentifier(nameof<compiler.Package>()), [], []));
        constructor.addArgument(`${EOL}${this.PackageOptions.getFullText()}`);

        file.addVariableStatement(
            {
                isExported: true,
                declarationKind: VariableDeclarationKind.Let,
                docs: [
                    {
                        description: `${EOL}The package.`
                    }
                ],
                declarations: [
                    {
                        name: this.Generator.PackageVariableName,
                        initializer: constructor.getFullText()
                    }
                ]
            });

            for (let component of this.Generator.InstructionComponents)
            {
                if (
                    component instanceof InstructionComponent &&
                    (this.Generator.Settings[GeneratorSettingKey.Components] ?? []).includes(component.ID))
                {
                    await this.AddComponent(file, component);
                }
            }

        return file;
    }
}
