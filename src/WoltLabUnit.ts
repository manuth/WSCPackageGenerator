import { FileMapping, GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { ComponentBase, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { dirname, join, normalize, relative, sep } from "upath";
import { WoltLabUnitQuestion } from "./Inquiry/WoltLabUnitQuestion";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "./WoltLabGenerator";
import { WoltLabSettingKey } from "./WoltLabSettingKey";

/**
 * Represents a unit of a woltlab component.
 */
export abstract class WoltLabUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends ComponentBase<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the `WoltLabUnit` class.
     *
     * @param generator
     * The generator of the unit.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * Gets the id of the unit.
     */
    public abstract get ID(): string;

    /**
     * @inheritdoc
     */
    public get Generator(): WoltLabGenerator<TSettings, TOptions>
    {
        return super.Generator as WoltLabGenerator<TSettings, TOptions>;
    }

    /**
     * Gets a value indicating whether paths outside the `RootDir` are allowed.
     */
    public get AllowOutside(): boolean
    {
        return false;
    }

    /**
     * Gets the questions of the unit.
     */
    public get Questions(): Array<Question<TSettings>>
    {
        return [
            this.UnitPathQuestion
        ];
    }

    /**
     * Gets the file-mappings of the unit.
     */
    public get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            this.UnitFileMapping
        ];
    }

    /**
     * Gets the question for asking for the unit-path.
     */
    protected get UnitPathQuestion(): Question<TSettings>
    {
        return new WoltLabUnitQuestion(this);
    }

    /**
     * Gets the file-mapping for the unit.
     */
    protected get UnitFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            Source: (target, generator) => this.GetTemplateFileName(target, generator as WoltLabGenerator<TSettings, TOptions>),
            Context: (target, generator) => this.GetTemplateContext(target, generator as WoltLabGenerator<TSettings, TOptions>),
            Destination: (target, generator) => generator.Settings[WoltLabSettingKey.UnitPaths][this.ID]
        };
    }

    /**
     * Gets the message to show to the user.
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    public async Message(answers: TSettings): Promise<string>
    {
        return "Where do you want to store the metadata?";
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
    public RootDir(answers: TSettings): string
    {
        return this.Generator.componentPath();
    }

    /**
     * Gets the default base-name of the path to safe the unit-file to.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    public abstract DefaultBaseName(answers: TSettings): string;

    /**
     * Creates a context for copying the template-file.
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
    protected abstract GetTemplateFileName(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): string;

    /**
     * Creates a context for copying the template-file.
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
    protected GetTemplateContext(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): any
    {
        return {
            RelativeSourceRoot: (() =>
            {
                let result = relative(
                    dirname(target.Destination),
                    join(generator.Settings[TSProjectSettingKey.Destination], generator.sourcePath()));

                if (!result.startsWith("."))
                {
                    result = `./${result}`;
                }

                if (!result.endsWith("/"))
                {
                    result = `${result}/`;
                }

                return result;
            })(),
            MakePackagePath: (() =>
            {
                let levels = relative(dirname(target.Destination), generator.Settings[TSProjectSettingKey.Destination]).split(sep).length;

                return (path: string) =>
                {
                    let pathSegments = normalize(path).split(sep);
                    let result = "join(__dirname";

                    for (let i = 0; i < levels; i++)
                    {
                        result = `${result}, ".."`;
                    }

                    for (let segment of pathSegments)
                    {
                        result = `${result}, "${segment}"`;
                    }

                    result = `${result})`;
                    return result;
                };
            })()
        };
    }
}
