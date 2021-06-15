import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import type { TemplateInstruction } from "@manuth/woltlab-compiler";
import { ApplicationPrompt } from "../../../Components/Inquiry/Prompts/ApplicationPrompt";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion";
import { PathPrompt } from "../../../Components/Inquiry/Prompts/PathPrompt";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { TemplateInstructionFileMapping } from "../FileMappings/TemplateInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { ITemplateComponentOptions } from "./ITemplateComponentOptions";

/**
 * Provides a component for generating templates.
 */
export class TemplateComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ITemplateComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
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
    public get InstructionFileName(): string
    {
        return this.WoltLabGenerator.componentPath("Templates.ts");
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
    public get VariableName(): string
    {
        return `My${nameof<TemplateInstruction>()}`;
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
     * Gets a question for asking for the source of the templates.
     */
    protected get SourceQuestion(): Question<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName,
            name: "Source",
            message: "Where do you want to store the templates?",
            default: (options: TComponentOptions) =>
            {
                return this.WoltLabGenerator.assetPath(options.Application, "templates");
            }
        } as Question<ITemplateComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [
            ...super.ComponentOptionQuestionCollection,
            this.AppQuestion,
            this.SourceQuestion
        ] as Array<Question<ITemplateComponentOptions>>;
    }

    /**
     * Gets the file-mapping for creating the instruction-file.
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new TemplateInstructionFileMapping(this);
    }
}
