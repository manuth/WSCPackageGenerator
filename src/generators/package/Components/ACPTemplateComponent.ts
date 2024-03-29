import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { IPathQuestion } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import type { ACPTemplateInstruction } from "@manuth/woltlab-compiler";
import { Question } from "inquirer";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion.js";
import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";
import { TemplateComponent } from "./TemplateComponent.js";

/**
 * Provides a component for generating acp-templates.
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
export class ACPTemplateComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends TemplateComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public override get ID(): string
    {
        return PackageComponentType.ACPTemplate;
    }

    /**
     * @inheritdoc
     */
    public override get DisplayName(): string
    {
        return "ACP-Templates";
    }

    /**
     * @inheritdoc
     */
    protected override get DefaultSourceBaseName(): string
    {
        return "acpTemplates";
    }

    /**
     * @inheritdoc
     */
    protected override get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        let question = super.AppQuestion;
        this.TransformQuestion(question);
        return question;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        let question = super.SourceQuestion;
        this.TransformQuestion(question);
        return question;
    }

    /**
     * @inheritdoc
     */
    protected override get TemplateFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            ...super.TemplateFileMapping,
            Source: this.Generator.templatePath("acpTemplate.tpl")
        };
    }

    /**
     * Transforms the message of the question accordingly.
     *
     * @param question
     * The question to transform.
     */
    protected TransformQuestion(question: Question<TComponentOptions>): void
    {
        let originalMessage = question.message;

        let processor = (question: string): string =>
        {
            return question.replace("templates", "Admin Control Panel-templates");
        };

        question.message = async (answers): Promise<string> =>
        {
            if (typeof originalMessage === "function")
            {
                return processor(await originalMessage(answers));
            }
            else
            {
                return processor(await originalMessage);
            }
        };
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-class.
     */
    protected override GetClassName(options: TComponentOptions): string
    {
        return nameof<ACPTemplateInstruction>();
    }
}
