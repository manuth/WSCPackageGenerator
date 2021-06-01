import { FileMapping, GeneratorOptions, ResolveFunction } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { DynamicQuestionProperty } from "inquirer";
import { IWoltLabGeneratorSettings } from "../../../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { WoltLabUnit } from "../../../WoltLabUnit";

/**
 * Represents a unit of a woltlab-theme.
 */
export class ThemeUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * The id of the unit.
     */
    private id: string;

    /**
     * The display-name of the unit.
     */
    private displayName: string;

    /**
     * The source to load the unit-file from.
     */
    private source: ResolveFunction<FileMapping<TSettings, TOptions>, TSettings, TOptions, string>;

    /**
     * The message to show to the user.
     */
    private message: DynamicQuestionProperty<string, TSettings>;

    /**
     * The default base-name of the unit-file path.
     */
    private defaultBaseName: DynamicQuestionProperty<string, TSettings>;

    /**
     * Initializes a new instance of the `ThemeUnit` class.
     *
     * @param generator
     * The generator of the unit.
     *
     * @param id
     * The ID of the unit.
     *
     * @param displayName
     * The display-name of the unit.
     *
     * @param source
     * The path to load the template from.
     *
     * @param message
     * The message to display.
     *
     * @param defaultBaseName
     * The default base-name of the path.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>, id: string, displayName: string, source: ResolveFunction<FileMapping<TSettings, TOptions>, TSettings, TOptions, string>, message: DynamicQuestionProperty<string, TSettings>, defaultBaseName: DynamicQuestionProperty<string, TSettings>)
    {
        super(generator);
        this.id = id;
        this.displayName = displayName;
        this.source = source;
        this.message = message;
        this.defaultBaseName = defaultBaseName;
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return this.id;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return this.displayName;
    }

    /**
     * @inheritdoc
     */
    public override get AllowOutside(): boolean
    {
        return true;
    }

    /**
     * Gets the root directory to store the unit-file in.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    public override RootDir(answers: TSettings): string
    {
        return this.Generator.assetPath("themes", answers[TSProjectSettingKey.Name]);
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    public DefaultBaseName(answers: TSettings): string
    {
        if (typeof this.defaultBaseName === "function")
        {
            return this.defaultBaseName(answers);
        }
        else
        {
            return this.defaultBaseName;
        }
    }

    /**
     * @inheritdoc
     *
     * @param target
     * The file-mapping to get the context for.
     *
     * @param generator
     * The generator of the file-mapping.
     *
     * @returns
     * The context for copying the template-file.
     */
    protected GetTemplateFileName(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): string
    {
        return this.source(target, generator);
    }
}
