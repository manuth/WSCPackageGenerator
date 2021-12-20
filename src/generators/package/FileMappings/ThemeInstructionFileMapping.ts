import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import type compiler = require("@manuth/woltlab-compiler");
import { ObjectLiteralExpression, OptionalKind, printNode, PropertyAssignmentStructure, SourceFile, SyntaxKind, ts } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { InstructionFileMapping } from "../../../FileMappings/InstructionFileMapping";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { IThemeComponentOptions } from "../Settings/IThemeComponentOptions";
import { ThemeComponent } from "../Settings/ThemeComponent";

/**
 * The `@manuth/woltlab-compiler` package.
 */
type WoltLabCompiler = typeof compiler;

/**
 * Provides the functionality to generate theme-instructions.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export class ThemeInstructionFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IThemeComponentOptions> extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link SelfContainedPHPFileMapping `SelfContainedPHPFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let result = super.InstructionOptions;
        let themeObject = this.GetObjectLiteral();
        let displayNameObject = this.GetObjectLiteral();

        displayNameObject.addPropertyAssignment(
            {
                name: printNode(ts.factory.createComputedPropertyName(ts.factory.createIdentifier(nameof<WoltLabCompiler>((compiler) => compiler.InvariantCultureName)))),
                initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.DisplayName))
            });

        let properties: Array<OptionalKind<PropertyAssignmentStructure>> = [
            {
                name: nameof<compiler.IThemeLoaderOptions>((options) => options.Name),
                initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.Name))
            },
            {
                name: nameof<compiler.IThemeLoaderOptions>((options) => options.DisplayName),
                initializer: displayNameObject.getFullText()
            }
        ];

        if (this.Component.ComponentOptions.Components.includes(ThemeComponent.CustomScss))
        {
            properties.push(
                {
                    name: nameof<compiler.IThemeLoaderOptions>((options) => options.CustomScssFileName),
                    initializer: this.GetPathJoin(this.Component.ComponentOptions.CustomScssFileName).getFullText()
                });
        }

        if (this.Component.ComponentOptions.Components.includes(ThemeComponent.ScssOverrides))
        {
            properties.push(
                {
                    name: nameof<compiler.IThemeLoaderOptions>((options) => options.ScssOverrideFileName),
                    initializer: this.GetPathJoin(this.Component.ComponentOptions.ScssOverridesFileName).getFullText()
                });
        }

        if (this.Component.ComponentOptions.Components.includes(ThemeComponent.Variables))
        {
            properties.push(
                {
                    name: nameof<compiler.IThemeLoaderOptions>((options) => options.VariableFileName),
                    initializer: this.GetPathJoin(this.Component.ComponentOptions.VariableFileName).getFullText()
                });
        }

        themeObject.addPropertyAssignments(properties);

        result.addPropertyAssignment(
            {
                name: nameof<compiler.IThemeInstructionOptions>((options) => options.Theme),
                initializer: themeObject.getFullText()
            });

        return result;
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

        file.addImportDeclarations(
            [
                {
                    moduleSpecifier: "path",
                    namedImports: [
                        nameof(join)
                    ]
                },
                {
                    moduleSpecifier: "@manuth/woltlab-compiler",
                    namedImports: [
                        nameof<WoltLabCompiler>((compiler) => compiler.InvariantCultureName)
                    ]
                }
            ]);

        return file;
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
}
