import { EOL } from "os";
import { GeneratorOptions, GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey, TypeScriptTransformMapping } from "@manuth/generator-ts-project";
import { TempFileSystem } from "@manuth/temp-files";
import { IPackageOptions, IRequiredPackageDescriptorOptions, Package, RequiredPackageDescriptor } from "@manuth/woltlab-compiler";
import { ArrayLiteralExpression, NewExpression, ObjectLiteralExpression, printNode, Project, SourceFile, SyntaxKind, ts, VariableDeclarationKind } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey";
import { WoltLabGenerator } from "../../../WoltLabGenerator";

/**
 * Provides the functionality to generate a package-file.
 */
export class WoltLabPackageFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends TypeScriptTransformMapping<TSettings, TOptions>
{
    /**
     * The generator of the file-mapping.
     */
    private woltLabGenerator: WoltLabGenerator<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabPackageFileMapping `WoltLabPackageFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The component to create an instruction-file for.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
        this.woltLabGenerator = generator;
    }

    /**
     * @inheritdoc
     */
    public override get Generator(): WoltLabGenerator<TSettings, TOptions>
    {
        return this.woltLabGenerator;
    }

    /**
     * @inheritdoc
     */
    public override get Metadata(): Promise<SourceFile>
    {
        return (
            async () =>
            {
                return new Project().createSourceFile(
                    this.Destination,
                    null,
                    {
                        overwrite: true
                    });
            })();
    }

    /**
     * @inheritdoc
     */
    public get Source(): string
    {
        return null;
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
        let options = this.GetObjectNode();

        options.addPropertyAssignments(
            [
                {
                    name: nameof<IRequiredPackageDescriptorOptions>((options) => options.Identifier),
                    initializer: printNode(ts.factory.createStringLiteral("com.woltlab.wcf"))
                },
                {
                    name: nameof<IRequiredPackageDescriptorOptions>((options) => options.MinVersion),
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
        let constructor = this.GetConstructorCall(nameof<RequiredPackageDescriptor>());
        constructor.addArgument(`${EOL}${this.RequiredPackageOptions.getFullText()}`);
        return constructor;
    }

    /**
     * Gets the options to pass to the package-constructor.
     */
    protected get PackageOptions(): ObjectLiteralExpression
    {
        let invariantLanguageName = "inv";
        let options = this.GetObjectNode();
        let displayName = this.GetObjectNode();
        let author = this.GetObjectNode();
        let description = this.GetObjectNode();
        let installSet = this.GetObjectNode();
        let requiredPackages = this.GetArrayLiteral();

        displayName.addPropertyAssignment(
            {
                name: invariantLanguageName,
                initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[TSProjectSettingKey.DisplayName]))
            });

        author.addPropertyAssignments(
            [
                {
                    name: nameof<IPackageOptions>((options) => options.Author.Name),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.Author]))
                },
                {
                    name: nameof<IPackageOptions>((options) => options.Author.URL),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.HomePage]))
                }
            ]);

        description.addPropertyAssignment(
            {
                name: invariantLanguageName,
                initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[TSProjectSettingKey.Description]))
            });

        installSet.addPropertyAssignment(
            {
                name: nameof<IPackageOptions>((options) => options.InstallSet.Instructions),
                initializer: printNode(ts.factory.createArrayLiteralExpression())
            });

        requiredPackages.addElement(`${EOL}${this.RequiredPackageConstructor.getFullText()}${EOL}`);

        options.addPropertyAssignments(
            [
                {
                    name: nameof<IPackageOptions>((options) => options.Identifier),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[WoltLabSettingKey.Identifier]))
                },
                {
                    name: nameof<IPackageOptions>((options) => options.Name),
                    initializer: printNode(ts.factory.createStringLiteral(this.Generator.Settings[TSProjectSettingKey.Name]))
                },
                {
                    name: nameof<IPackageOptions>((options) => options.DisplayName),
                    initializer: displayName.getFullText()
                },
                {
                    name: nameof<IPackageOptions>((options) => options.Version),
                    initializer: printNode(ts.factory.createStringLiteral("0.0.0"))
                },
                {
                    name: nameof<IPackageOptions>((options) => options.Author),
                    initializer: author.getFullText()
                },
                {
                    name: nameof<IPackageOptions>((options) => options.License),
                    initializer: printNode(ts.factory.createNull())
                },
                {
                    name: nameof<IPackageOptions>((options) => options.CreationDate),
                    initializer: printNode(
                        ts.factory.createNewExpression(
                            ts.factory.createIdentifier(nameof<Date>()),
                            [],
                            [
                                ts.factory.createStringLiteral(this.CreationDate)
                            ]))
                },
                {
                    name: nameof<IPackageOptions>((options) => options.Description),
                    initializer: description.getFullText()
                },
                {
                    name: nameof<IPackageOptions>((options) => options.InstallSet),
                    initializer: installSet.getFullText()
                },
                {
                    name: nameof<IPackageOptions>((options) => options.RequiredPackages),
                    initializer: requiredPackages.getFullText()
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
    protected GetObjectNode(): ObjectLiteralExpression
    {
        let variableName = "tmp";
        let file = new Project().createSourceFile(TempFileSystem.TempName());

        file.addVariableStatement(
            {
                declarationKind: VariableDeclarationKind.Let,
                declarations: [
                    {
                        name: variableName,
                        initializer: printNode(ts.factory.createObjectLiteralExpression())
                    }
                ]
            });

        return file.getVariableDeclaration(variableName).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
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
        let variableName = "tmp";
        let file = new Project().createSourceFile(TempFileSystem.TempName());

        file.addVariableStatement(
            {
                isExported: true,
                declarationKind: VariableDeclarationKind.Let,
                declarations: [
                    {
                        name: variableName,
                        initializer: printNode(
                            ts.factory.createNewExpression(ts.factory.createIdentifier(className), [], []))
                    }
                ]
            });

        return file.getVariableDeclaration(variableName).getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
    }

    /**
     * Gets an {@link Array `ArrayLiteralExpression`}-node.
     *
     * @returns
     * The newly created {@link ArrayLiteralExpression `ArrayLiteralExpression`}.
     */
    protected GetArrayLiteral(): ArrayLiteralExpression
    {
        let variableName = "tmp";
        let file = new Project().createSourceFile(TempFileSystem.TempName());

        file.addVariableStatement(
            {
                declarationKind: VariableDeclarationKind.Let,
                declarations: [
                    {
                        name: variableName,
                        initializer: printNode(ts.factory.createArrayLiteralExpression())
                    }
                ]
            });

        return file.getVariableDeclaration(variableName).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
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
                        name: nameof<Package>()
                    },
                    {
                        name: nameof<RequiredPackageDescriptor>()
                    }
                ]
            });

        file.addVariableStatement(
            {
                isExported: true,
                declarationKind: VariableDeclarationKind.Let,
                declarations: [
                    {
                        name: this.Generator.PackageVariableName,
                        initializer: printNode(
                            ts.factory.createNewExpression(ts.factory.createIdentifier(nameof<Package>()), [], []))
                    }
                ]
            });

        let constructor = file.getVariableDeclaration(this.Generator.PackageVariableName).getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
        constructor.addArgument(`${EOL}${this.PackageOptions.getFullText()}`);

        for (let category of this.Generator.Components.Categories)
        {
            for (let component of category.Components)
            {
                if (
                    component instanceof InstructionComponent &&
                    this.Generator.Settings[GeneratorSettingKey.Components].includes(component.ID))
                {
                    component.PackageFileTransformer.Transform(file);
                }
            }
        }

        file.formatText(
            {
                convertTabsToSpaces: true,
                indentSize: 4,
                placeOpenBraceOnNewLineForControlBlocks: true,
                placeOpenBraceOnNewLineForFunctions: true,
                insertSpaceAfterFunctionKeywordForAnonymousFunctions: false
            });

        return file;
    }
}
