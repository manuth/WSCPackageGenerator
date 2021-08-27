import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { SQLInstruction } from "@manuth/woltlab-compiler";
import { join } from "upath";
import { IPathQuestion } from "../../../Components/Inquiry/Prompts/IPathQuestion";
import { LocalInstructionComponent } from "../../../Components/LocalInstructionComponent";
import { ILocalComponentOptions } from "../../../Settings/ILocalComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating sql-script instructions.
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
