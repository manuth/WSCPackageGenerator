import { join } from "path";
import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import type { ApplicationFileSystemInstruction } from "@manuth/woltlab-compiler";
import { FileUploadComponentBase } from "../../../Components/FileUploadComponentBase";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion";
import { IPathQuestion } from "../../../Components/Inquiry/Prompts/IPathQuestion";
import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for uploading files.
 */
export class FileUploadComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends FileUploadComponentBase<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link FileUploadComponent `FileUploadComponent<TSettings, TOptions, TComponentOptions>`} class.
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
        return nameof<ApplicationFileSystemInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.FileUpload;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Files to Upload";
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            this.ExampleFileMapping
        ];
    }

    /**
     * Gets the default name of the folder to suggest in the {@link TemplateComponent.SourceQuestion `SourceQuestion`}.
     */
    protected get DefaultSourceBaseName(): string
    {
        return "files";
    }

    /**
     * Gets the question for asking for the application.
     */
    protected override get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        return {
            ...super.AppQuestion,
            message: "What application do you want to upload the files to?"
        } as IApplicationQuestion<IFileUploadComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            ...super.SourceQuestion,
            message: "Where do you want to store the files?"
        } as IPathQuestion<IFileUploadComponentOptions>;
    }

    /**
     * Gets the file-mapping for creating the example-file.
     */
    protected get ExampleFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            Destination: join(this.ComponentOptions.Source, "Place files here"),
            Processor: (target, generator) =>
            {
                generator.fs.write(target.Destination, "");
            }
        };
    }
}
