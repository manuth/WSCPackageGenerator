import { EOL } from "os";
import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TypeScriptCreatorMapping } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import { Package, PackageCompiler } from "@manuth/woltlab-compiler";
import { printNode, SourceFile, SyntaxKind, ts, VariableDeclarationKind } from "ts-morph";
import path from "upath";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabPackageGenerator } from "../../package/WoltLabPackageGenerator.js";

const { relative, sep } = path;

/**
 * Provides the functionality to create an entry-point.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export class EntryPointFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends TypeScriptCreatorMapping<TSettings, TOptions>
{
    /**
     * The generator of the file-mapping.
     */
    private woltLabGenerator: WoltLabPackageGenerator<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link EntryPointFileMapping `EntryPointFileMapping`} class.
     *
     * @param generator
     * The component to create an instruction-file for.
     */
    public constructor(generator: WoltLabPackageGenerator<TSettings, TOptions>)
    {
        super(generator);
        this.woltLabGenerator = generator;
    }

    /**
     * @inheritdoc
     */
    public override get Generator(): WoltLabPackageGenerator<TSettings, TOptions>
    {
        return this.woltLabGenerator;
    }

    /**
     * @inheritdoc
     */
    public get Destination(): string
    {
        return this.Generator.sourcePath("index.ts");
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
        let compilerVariableName = "compiler";
        file = await super.Transform(file);

        file.addImportDeclarations(
            [
                {
                    moduleSpecifier: "path",
                    namedImports: [
                        {
                            name: nameof(join)
                        }
                    ]
                },
                {
                    moduleSpecifier: "@manuth/woltlab-compiler",
                    namedImports: [
                        {
                            name: nameof<PackageCompiler>()
                        }
                    ]
                },
                {
                    moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(this.Generator.destinationPath(this.Generator.WoltLabPackageFileMapping.Destination)),
                    namedImports: [
                        this.Generator.PackageVariableName
                    ]
                }
            ]);

        file.addVariableStatement(
            {
                declarationKind: VariableDeclarationKind.Let,
                declarations: [
                    {
                        name: compilerVariableName,
                        initializer: printNode(
                            ts.factory.createNewExpression(
                                ts.factory.createIdentifier(nameof<PackageCompiler>()),
                                [],
                                [
                                    ts.factory.createIdentifier(this.Generator.PackageVariableName)
                                ]))
                    }
                ]
            });

        let pathComponents: ts.Expression[] = [
            ts.factory.createIdentifier(nameof(__dirname))
        ];

        for (let pathComponent of relative(file.getDirectoryPath(), this.Generator.destinationPath()).split(sep))
        {
            pathComponents.push(ts.factory.createStringLiteral(pathComponent));
        }

        file.addStatements(
            `${EOL}(${EOL}` +
            printNode(
                ts.factory.createArrowFunction(
                    [
                        ts.factory.createModifier(SyntaxKind.AsyncKeyword)
                    ],
                    [],
                    [],
                    undefined,
                    undefined,
                    ts.factory.createBlock(
                        [
                            ts.factory.createExpressionStatement(
                                ts.factory.createAssignment(
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier(compilerVariableName),
                                        ts.factory.createIdentifier(nameof<PackageCompiler>((compiler) => compiler.DestinationPath))),
                                    ts.factory.createCallExpression(
                                        ts.factory.createIdentifier(nameof(join)),
                                        [],
                                        [
                                            ...pathComponents,
                                            ts.factory.createTemplateExpression(
                                                ts.factory.createTemplateHead(""),
                                                [
                                                    ts.factory.createTemplateSpan(
                                                        ts.factory.createPropertyAccessExpression(
                                                            ts.factory.createIdentifier(this.Generator.PackageVariableName),
                                                            ts.factory.createIdentifier(nameof<Package>((data) => data.Identifier))),
                                                        ts.factory.createTemplateMiddle("-")),
                                                    ts.factory.createTemplateSpan(
                                                        ts.factory.createPropertyAccessExpression(
                                                            ts.factory.createIdentifier(this.Generator.PackageVariableName),
                                                            ts.factory.createIdentifier(nameof<Package>((data) => data.Version))),
                                                        ts.factory.createTemplateTail(".tar"))
                                                ]
                                            )
                                        ]))),
                            ts.factory.createExpressionStatement(
                                ts.factory.createAwaitExpression(
                                    ts.factory.createCallExpression(
                                        ts.factory.createPropertyAccessExpression(
                                            ts.factory.createIdentifier(compilerVariableName),
                                            ts.factory.createIdentifier(nameof<PackageCompiler>((compiler) => compiler.Execute))),
                                        [],
                                        [])))
                        ],
                        true))
            ) +
            ")();");

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
