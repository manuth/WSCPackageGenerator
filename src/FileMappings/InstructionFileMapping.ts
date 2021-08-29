import { EOL } from "os";
import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TypeScriptCreatorMapping } from "@manuth/generator-ts-project";
import { CallExpression, ObjectLiteralExpression, printNode, SourceFile, SyntaxKind, ts, VariableDeclarationKind } from "ts-morph";
import { dirname, relative, sep } from "upath";
import { InstructionComponent } from "../Components/InstructionComponent";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../Settings/WoltLabSettingKey";

/**
 * Provides the functionality to generate instruction-files.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 *
 * @template TComponentOptions
 * The type of the component-options.
 */
export class InstructionFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends TypeScriptCreatorMapping<TSettings, TOptions>
{
    /**
     * The component to create an instruction-file for.
     */
    private component: InstructionComponent<TSettings, TOptions, TComponentOptions>;

    /**
     * Initializes a new instance of the {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component.Generator);
        this.component = component;
    }

    /**
     * Gets the component to create an instruction-file for.
     */
    protected get Component(): InstructionComponent<TSettings, TOptions, TComponentOptions>
    {
        return this.component;
    }

    /**
     * Gets the options to pass to the instruction-constructor.
     */
    protected get InstructionOptions(): ObjectLiteralExpression
    {
        return this.Converter.WrapNode(ts.factory.createParenthesizedExpression(ts.factory.createObjectLiteralExpression())).getExpressionIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
    }

    /**
     * @inheritdoc
     */
    public get Destination(): string
    {
        return this.Generator.Settings[WoltLabSettingKey.ComponentOptions][this.Component.ID][WoltLabComponentKey.Path];
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
                        name: this.Component.ClassName
                    }
                ]
            });

        file.addVariableStatement(
            {
                isExported: true,
                declarationKind: VariableDeclarationKind.Let,
                docs: [
                    {
                        description: `${EOL}The instruction.`
                    }
                ],
                declarations: [
                    {
                        name: this.Component.VariableName,
                        initializer: printNode(
                            ts.factory.createNewExpression(ts.factory.createIdentifier(this.Component.ClassName), [], []))
                    }
                ]
            });

        let constructor = file.getVariableDeclaration(this.Component.VariableName).getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
        constructor.addArgument(`${EOL}${this.InstructionOptions.getFullText()}`);

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

    /**
     * Creates valid TypeScript-code for calling the {@link join `join`}-method.
     *
     * @param path
     * The path to point to.
     *
     * @returns
     * Valid TypeScript-code containing a {@link join `join`}-call for pointing to the specified {@link path `path`}.
     */
    protected GetPathJoin(path: string): CallExpression
    {
        let call = this.Converter.WrapNode(ts.factory.createCallExpression(ts.factory.createIdentifier(nameof(join)), [], []));
        call.addArgument(printNode(ts.factory.createIdentifier(nameof(__dirname))));

        for (let pathComponent of relative(dirname(this.Generator.destinationPath(this.Destination)), this.Generator.destinationPath()).split(sep))
        {
            call.addArgument(printNode(ts.factory.createStringLiteral(pathComponent)));
        }

        for (let pathComponent of relative(this.Generator.destinationPath(), this.Generator.destinationPath(path)).split(sep))
        {
            call.addArgument(printNode(ts.factory.createStringLiteral(pathComponent)));
        }

        return call;
    }
}
