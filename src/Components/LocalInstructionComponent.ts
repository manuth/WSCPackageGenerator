import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
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
     * Gets the default name of the path to suggest in the {@link LocalInstructionComponent.SourceQuestion `SourceQuestion`}.
     */
    protected abstract get DefaultSourceBaseName(): string;

    /**
     * Gets a question for asking for the source of the templates.
     */
    protected get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName,
            name: "Source",
            default: (options: TComponentOptions) =>
            {
                return this.GetDefaultSource(options);
            }
        } as IPathQuestion<ILocalComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [
            ...super.ComponentOptionQuestionCollection,
            this.SourceQuestion
        ];
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new LocalFileInstructionMapping(this);
    }

    /**
     * Gets the default full name of the path to suggest in the {@link LocalInstructionComponent.SourceQuestion `SourceQuestion`}.
     *
     * @param options
     * The options of the component.
     *
     * @returns
     * The default full name of the path to suggest in the {@link LocalInstructionComponent.SourceQuestion `SourceQuestion`}.
     */
    protected GetDefaultSource(options: TComponentOptions): string
    {
        return this.WoltLabGenerator.assetPath(this.DefaultSourceBaseName);
    }
}
