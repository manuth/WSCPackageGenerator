import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ComponentBase } from "@manuth/generator-ts-project";
import { Question } from "yeoman-generator";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { WoltLabComponentKey } from "../Settings/WoltLabComponentKey";
import { WoltLabGeneratorSettingKey } from "../Settings/WoltLabGeneratorSettingKey";
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
     * A question for asking for the component-path.
     */
    protected get PathQuestion(): Question<TSettings>
    {
        return {
            type: PathPrompt.TypeName,
            message: "Wheres do you want to store the component?",
            name: `${WoltLabGeneratorSettingKey.ComponentOptions}[${WoltLabComponentKey.Path}]`
        };
    }

    /**
     * Gets the questions for the component-options.
     */
    protected get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [];
    }

    /**
     * Gets the questions for asking for the component-options.
     */
    protected get ComponentOptionQuestion(): Question<TSettings>
    {
        return {
            type: QuestionCollectionPrompt.TypeName,
            questions: this.ComponentOptionQuestionCollection
        };
    }

    /**
     * Gets the questions of the component.
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            this.PathQuestion,
            this.ComponentOptionQuestion
        ];
    }
}
