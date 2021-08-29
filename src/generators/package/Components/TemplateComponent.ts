import { join } from "path";
import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { TemplateInstruction } from "@manuth/woltlab-compiler";
import { FileUploadComponentBase } from "../../../Components/FileUploadComponentBase";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion";
import { IPathQuestion } from "../../../Components/Inquiry/Prompts/IPathQuestion";
import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating templates.
 */
export class TemplateComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends FileUploadComponentBase<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`} class.
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
     * @inheritdoc
     */
    protected get DefaultSourceBaseName(): string
    {
        return "templates";
    }

    /**
     * @inheritdoc
     */
    protected override get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        return {
            ...super.AppQuestion,
            message: "What application do you want to upload the templates to?"
        } as IApplicationQuestion<IFileUploadComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            ...super.SourceQuestion,
            message: "Where do you want to store the templates?"
        } as IPathQuestion<IFileUploadComponentOptions>;
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
