import { Generator, GeneratorOptions, IGenerator, Question } from "@manuth/extended-yo-generator";
import { TSProjectGenerator } from "@manuth/generator-ts-project";
import { join } from "upath";
import { ApplicationPrompt } from "./Components/Inquiry/Prompts/ApplicationPrompt";
import { PathPrompt } from "./Components/Inquiry/Prompts/PathPrompt";
import { QuestionCollectionPrompt } from "./Components/Inquiry/Prompts/QuestionCollectionPrompt";
import { WoltLabIdentifierQuestion } from "./Inquiry/WoltLabIdentifierQuestion";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";
import { WoltLabSettingKey } from "./WoltLabSettingKey";

/**
 * Represents a generator for WoltLab-components.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class WoltLabGenerator<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends Generator.ComposeWith(TSProjectGenerator, require.resolve("@manuth/generator-ts-project"))<TSettings, TOptions> implements IGenerator<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`} class.
     *
     * @param args
     * A set of arguments for the generator.
     *
     * @param options
     * A set of options for the generator.
     */
    public constructor(args: string | string[], options: TOptions)
    {
        super(args, options);
        this.env.adapter.promptModule.registerPrompt(PathPrompt.TypeName, PathPrompt);
        this.env.adapter.promptModule.registerPrompt(ApplicationPrompt.TypeName, ApplicationPrompt);
        this.env.adapter.promptModule.registerPrompt(QuestionCollectionPrompt.TypeName, QuestionCollectionPrompt);
    }

    /**
     * @inheritdoc
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            ...super.Questions,
            {
                type: "input",
                name: WoltLabSettingKey.Author,
                message: "What's the name of the package-author?",
                default: () => this.config.get(WoltLabSettingKey.Author) ?? this.user.git.name()
            },
            {
                type: "input",
                name: WoltLabSettingKey.HomePage,
                message: "What's the homepage of the package-author?",
                default: () => this.config.get(WoltLabSettingKey.HomePage)
            },
            new WoltLabIdentifierQuestion(this)
        ];
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the assets-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the assets.
     */
    public assetPath(...path: string[]): string
    {
        return join("assets", ...path);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the source-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the source-directory.
     */
    public sourcePath(...path: string[]): string
    {
        return join("src", ...path);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the meta-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the metadata-directory.
     */
    public metaPath(...path: string[]): string
    {
        return this.sourcePath("Meta", ...path);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the component-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the component-directory.
     */
    public componentPath(...path: string[]): string
    {
        return this.metaPath("Components", ...path);
    }
}
