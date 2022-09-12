import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { FileUploadMapping } from "../FileMappings/FileUploadMapping.js";
import { IFileUploadComponentOptions } from "../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";
import { ApplicationPrompt } from "./Inquiry/Prompts/ApplicationPrompt.js";
import { IApplicationQuestion } from "./Inquiry/Prompts/IApplicationQuestion.js";
import { LocalInstructionComponent } from "./LocalInstructionComponent.js";

/**
 * Provides a component for file-uploads.
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
export abstract class FileUploadComponentBase<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends LocalInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link FileUploadComponentBase `FileUploadComponentBase<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * Gets the question for asking for the application.
     */
    protected get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        return {
            type: ApplicationPrompt.TypeName,
            name: nameof<IFileUploadComponentOptions>((options) => options.Application)
        } as IApplicationQuestion<IFileUploadComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        let result = [
            this.PathQuestion,
            this.AppQuestion,
            this.SourceQuestion
        ];

        for (let question of super.ComponentOptionQuestionCollection)
        {
            if (!result.includes(question))
            {
                result.push(question);
            }
        }

        return result as any;
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new FileUploadMapping(this);
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options of the component.
     *
     * @returns
     * The default full name of the path to suggest in the {@link LocalInstructionComponent.SourceQuestion `SourceQuestion`}.
     */
    protected override GetDefaultSource(options: TComponentOptions): string
    {
        return this.Generator.assetPath(this.DefaultSourceBaseName, options.Application);
    }
}
