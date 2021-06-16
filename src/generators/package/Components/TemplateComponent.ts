import { join } from "path";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import type { TemplateInstruction } from "@manuth/woltlab-compiler";
import { ApplicationPrompt } from "../../../Components/Inquiry/Prompts/ApplicationPrompt";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion";
import { LocalInstructionComponent } from "../../../Components/LocalInstructionComponent";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { TemplateInstructionFileMapping } from "../FileMappings/TemplateInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { ITemplateComponentOptions } from "./ITemplateComponentOptions";

/**
 * Provides a component for generating templates.
 */
export class TemplateComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ITemplateComponentOptions> extends LocalInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateComponent `TemplaceComponent<TSettings, TOptions, TComponentOptions>`} class.
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
     * @inheritdoc
     */
    public get ClassName(): string
    {
        return nameof<TemplateInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.Template;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Templates";
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            this.TemplateFileMapping
        ];
    }

    /**
     * Gets the default name of the folder to suggest in the {@link TemplateComponent.SourceQuestion `SourceQuestion`}.
     */
    protected get DefaultSourceFolderName(): string
    {
        return "templates";
    }

    /**
     * Gets the question for asking for the application.
     */
    protected get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        return {
            type: ApplicationPrompt.TypeName,
            name: "Application",
            message: "What application do you want to upload the templates to?"
        } as IApplicationQuestion<ITemplateComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): Question<TComponentOptions>
    {
        return {
            ...super.SourceQuestion,
            message: "Where do you want to store the templates?",
            default: (options: TComponentOptions) =>
            {
                return this.WoltLabGenerator.assetPath(options.Application, this.DefaultSourceFolderName);
            }
        } as Question<ITemplateComponentOptions>;
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
        return new TemplateInstructionFileMapping(this);
    }

    /**
     * Gets the file-mapping for creating the example-template.
     */
    protected get TemplateFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            Source: this.Generator.templatePath("template.tpl"),
            Destination: join(this.ComponentOptions.Source, "example.tpl")
        };
    }
}
