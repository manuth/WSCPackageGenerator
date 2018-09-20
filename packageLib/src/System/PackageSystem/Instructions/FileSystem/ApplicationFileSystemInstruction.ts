import { isNullOrUndefined } from "util";
import { FileSystemInstruction } from "./FileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "./IApplicationFileSystemInstructionOptions";

/**
 * Represents an instruction which uploads files for a specific application.
 */
export class ApplicationFileSystemInstruction extends FileSystemInstruction
{
    /**
     * The application to upload the files to.
     */
    private application: string = null;

    /**
     * Initializes a new instance of the `ApplicationFileSystemInstruction`.
     */
    public constructor(options: IApplicationFileSystemInstructionOptions)
    {
        super(
            {
                Source: options.Source,
                FileName: options.FileName || `${options.Source}.tar`
            });

        if (!isNullOrUndefined(options.Application))
        {
            this.Application = options.Application;
        }
    }

    public get Type(): string
    {
        return "file";
    }

    /**
     * Gets or sets the application to upload the files to.
     */
    public get Application(): string
    {
        return this.application;
    }

    public set Application(value: string)
    {
        this.application = value;
    }

    protected get XMLDocument(): Document
    {
        let result: Document = super.XMLDocument;

        if (!isNullOrUndefined(this.Application))
        {
            result.documentElement.setAttribute("application", this.Application);
        }

        return result;
    }
}