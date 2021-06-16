import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { FileUploadMapping } from "../FileMappings/FileUploadMapping";
import { IFileUploadComponentOptions } from "../Settings/IFileUploadComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { ApplicationPrompt } from "./Inquiry/Prompts/ApplicationPrompt";
import { IApplicationQuestion } from "./Inquiry/Prompts/IApplicationQuestion";
import { LocalInstructionComponent } from "./LocalInstructionComponent";

/**
 * Provides a component for file-uploads.
 */
export abstract class FileUploadComponentBase<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends LocalInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link FileUploadComponentBase `FileUploadComponentBase<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    public constructor(generator: WoltLabGenerator<any, TOptions>)
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
            name: "Application"
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

        return result;
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
        return this.WoltLabGenerator.assetPath(this.DefaultSourceBaseName, options.Application);
    }
}
