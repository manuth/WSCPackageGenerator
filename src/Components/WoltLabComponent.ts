import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ComponentBase } from "@manuth/generator-ts-project";
import { Question } from "yeoman-generator";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabComponentKey } from "../Settings/WoltLabComponentKey";
import { WoltLabGeneratorSettingKey } from "../Settings/WoltLabGeneratorSettingKey";
import { PathPrompt } from "./Inquiry/Prompts/PathPrompt";

/**
 * Represents a woltlab-component.
 */
export abstract class WoltLabComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends ComponentBase<TSettings, TOptions>
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
     * Gets the questions of the unit.
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            this.PathQuestion
        ];
    }
}
