import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { LocalFileInstructionMapping } from "../FileMappings/LocalFileInstructionMapping";
import { ILocalComponentOptions } from "../Settings/ILocalComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { PathPrompt } from "./Inquiry/Prompts/PathPrompt";
import { InstructionComponent } from "./InstructionComponent";

/**
 * Provides a component for generating instruction-files which are loaded from local.
 */
export abstract class LocalInstructionComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ILocalComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Gets a question for asking for the source of the templates.
     */
    protected get SourceQuestion(): Question<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName,
            name: "Source"
        } as Question<ILocalComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new LocalFileInstructionMapping(this);
    }
}
