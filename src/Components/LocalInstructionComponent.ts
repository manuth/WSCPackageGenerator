import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IPathQuestion, PathPrompt } from "@manuth/generator-ts-project";
import { LocalFileInstructionMapping } from "../FileMappings/LocalFileInstructionMapping.js";
import { ILocalComponentOptions } from "../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { InstructionComponent } from "./InstructionComponent.js";

/**
 * Provides a component for generating instruction-files which are loaded from local.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export abstract class LocalInstructionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends ILocalComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
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
            name: nameof<ILocalComponentOptions>((options) => options.Source),
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
            this.SourceQuestion as any as Question<TComponentOptions>
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
        return this.Generator.assetPath(this.DefaultSourceBaseName);
    }
}
