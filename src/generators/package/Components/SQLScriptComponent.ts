import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { IPathQuestion } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import type { SQLInstruction } from "@manuth/woltlab-compiler";
import path from "upath";
import { LocalInstructionComponent } from "../../../Components/LocalInstructionComponent.js";
import { ILocalComponentOptions } from "../../../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

const { join } = path;

/**
 * Provides a component for generating sql-script instructions.
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
export class SQLScriptComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends ILocalComponentOptions> extends LocalInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link SQLScriptComponent `SQLScriptComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public override get ClassName(): string
    {
        return nameof<SQLInstruction>();
    }

    /**
     * @inheritdoc
     */
    public override get ID(): string
    {
        return PackageComponentType.SQLScript;
    }

    /**
     * @inheritdoc
     */
    public override get DisplayName(): string
    {
        return "SQL-Script to Execute During the Installation";
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            this.SQLFileMapping
        ];
    }

    /**
     * @inheritdoc
     */
    protected get DefaultSourceBaseName(): string
    {
        return "install.sql";
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            ...super.SourceQuestion,
            message: "Where do you want to store the SQL-file?"
        } as IPathQuestion<ILocalComponentOptions>;
    }

    /**
     * Gets the file-mapping for creating the example sql-script.
     */
    protected get SQLFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            Destination: join(this.ComponentOptions.Source),
            Processor: (target, generator) =>
            {
                generator.fs.write(target.Destination, "");
            }
        };
    }
}
