import { GeneratorOptions, Question } from "@manuth/extended-yo-generator";
import { ComponentBase } from "@manuth/generator-ts-project";
import inquirer = require("inquirer");
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { WoltLabComponentKey } from "../Settings/WoltLabComponentKey";
import { WoltLabGeneratorSettingKey } from "../Settings/WoltLabGeneratorSettingKey";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { PathPrompt } from "./Inquiry/Prompts/PathPrompt";
import { QuestionCollectionPrompt } from "./Inquiry/Prompts/QuestionCollectionPrompt";

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
export abstract class WoltLabComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions = IWoltLabComponentOptions> extends ComponentBase<TSettings, TOptions>
{
    /**
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    private woltLabGenerator: WoltLabGenerator<any, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabComponent `WoltLabComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    public constructor(generator: WoltLabGenerator<any, TOptions>)
    {
        super(generator);
        this.woltLabGenerator = generator;
    }

    /**
     * Gets the generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    protected get WoltLabGenerator(): WoltLabGenerator<any, TOptions>
    {
        return this.woltLabGenerator;
    }

    /**
     * A question for asking for the component-path.
     */
    protected get PathQuestion(): Question<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName,
            message: "Where do you want to store the component?",
            name: WoltLabComponentKey.Path
        };
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
            type: QuestionCollectionPrompt.TypeName,
            name: `${WoltLabGeneratorSettingKey.ComponentOptions}[${this.ID}]`,
            promptTypes: this.PromptTypes,
            questions: this.ComponentOptionQuestionCollection
        };
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
}
