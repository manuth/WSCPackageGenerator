import { ComponentOptions, GeneratorOptions, Question } from "@manuth/extended-yo-generator";
import { PathPrompt, QuestionSetPrompt } from "@manuth/generator-ts-project";
import inquirer, { DistinctQuestion, QuestionTypeName } from "inquirer";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../Settings/WoltLabSettingKey.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";

/**
 * Represents a woltlab-component.
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
export abstract class WoltLabComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions = IWoltLabComponentOptions> extends ComponentOptions<TSettings, TOptions>
{
    /**
     * The generator of the component.
     */
    private woltLabGenerator: WoltLabGenerator<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabComponent `WoltLabComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
        this.woltLabGenerator = generator;
    }

    /**
     * Gets the generator of the component.
     */
    public override get Generator(): WoltLabGenerator<TSettings, TOptions>
    {
        return this.woltLabGenerator;
    }

    /**
     * A question for asking for the component-path.
     */
    protected get PathQuestion(): Question<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName as QuestionTypeName,
            message: "Where do you want to store the component?",
            name: WoltLabComponentSettingKey.Path
        } as DistinctQuestion<TComponentOptions> as any;
    }

    /**
     * Gets the questions for the component-options.
     */
    protected get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [
            this.PathQuestion
        ];
    }

    /**
     * Gets the prompt-types to register for asking the {@link WoltLabComponent.ComponentOptionQuestionCollection `ComponentOptionQuestionCollection`}.
     */
    protected get PromptTypes(): Record<string, inquirer.prompts.PromptConstructor>
    {
        return this.Generator.env.adapter.promptModule.prompts;
    }

    /**
     * Gets the questions for asking for the component-options.
     */
    protected get ComponentOptionQuestion(): Question<TSettings>
    {
        return {
            type: QuestionSetPrompt.TypeName as QuestionTypeName,
            name: `${WoltLabSettingKey.ComponentOptions}[${this.ID}]`,
            promptTypes: this.PromptTypes,
            questions: this.ComponentOptionQuestionCollection as Question[]
        } as DistinctQuestion<TSettings> as any;
    }

    /**
     * Gets the questions of the component.
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            this.ComponentOptionQuestion
        ];
    }

    /**
     * Gets the component-options that were provided by the user.
     */
    public get ComponentOptions(): TComponentOptions
    {
        return this.Generator.Settings[WoltLabSettingKey.ComponentOptions]?.[this.ID] as TComponentOptions;
    }
}
