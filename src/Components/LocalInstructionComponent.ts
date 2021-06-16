import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { LocalFileInstructionMapping } from "../FileMappings/LocalFileInstructionMapping";
import { ILocalComponentOptions } from "../Settings/ILocalComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { IPathQuestion } from "./Inquiry/Prompts/IPathQuestion";
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
    protected get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName,
            name: "Source"
        } as IPathQuestion<ILocalComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new LocalFileInstructionMapping(this);
    }
}
