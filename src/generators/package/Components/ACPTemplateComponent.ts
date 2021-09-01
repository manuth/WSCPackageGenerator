import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { IPathQuestion } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import { ACPTemplateInstruction } from "@manuth/woltlab-compiler";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion";
import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { TemplateComponent } from "./TemplateComponent";

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
    public override get ClassName(): string
    {
        return nameof<ACPTemplateInstruction>();
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

        if (typeof question.message === "string")
        {
            question.message = question.message.replace("templates", "Admin Control Panel-templates");
        }

        return question;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        let question = super.SourceQuestion;

        if (typeof question.message === "string")
        {
            question.message = question.message.replace("templates", "Admin Control Panel-templates");
        }

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
}
