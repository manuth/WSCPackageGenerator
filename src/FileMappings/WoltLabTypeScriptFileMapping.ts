import { fileURLToPath } from "node:url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey, TSProjectTypeScriptFileMapping } from "@manuth/generator-ts-project";
import { SourceFile, SyntaxKind, ts } from "ts-morph";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";

/**
 * Provides the functionality to generate typescript files for the {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export abstract class WoltLabTypeScriptFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends TSProjectTypeScriptFileMapping<TSettings, TOptions>
{
    /**
     * The generator of the file-mapping.
     */
    private woltLabGenerator: WoltLabGenerator<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabTypeScriptFileMapping `WoltLabTypeScriptFileMapping<TSettings, TOptions>`} class.
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
     * Applies the prerequisites required for using the directory name in this file.
     *
     * @param file
     * The file to apply the prerequisites to.
     */
    protected ApplyDirname(file: SourceFile): void
    {
        if (this.Generator.Settings[TSProjectSettingKey.ESModule])
        {
            file.addImportDeclaration(
                {
                    moduleSpecifier: "url",
                    namedImports: [
                        nameof(fileURLToPath)
                    ]
                });
        }
    }

    /**
     * Gets a typescript syntax node for determining the name of the directory of the file.
     *
     * @returns
     * A typescript syntax node for determining the name of the directory of the file.
     */
    protected GetDirname(): ts.Expression
    {
        if (!this.Generator.Settings[TSProjectSettingKey.ESModule])
        {
            return ts.factory.createIdentifier(nameof(__dirname));
        }
        else
        {
            return ts.factory.createCallExpression(
                ts.factory.createIdentifier(nameof(fileURLToPath)),
                [],
                [
                    ts.factory.createNewExpression(
                        ts.factory.createIdentifier(nameof(URL)),
                        [],
                        [
                            ts.factory.createStringLiteral("."),
                            ts.factory.createPropertyAccessExpression(
                                ts.factory.createMetaProperty(
                                    SyntaxKind.ImportKeyword,
                                    ts.factory.createIdentifier("meta")),
                                nameof<ImportMeta>((importMeta) => importMeta.url))
                        ])
                ]);
        }
    }
}
