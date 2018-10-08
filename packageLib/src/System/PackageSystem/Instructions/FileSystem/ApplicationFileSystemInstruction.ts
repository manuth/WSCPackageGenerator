import * as Path from "path";
import { isNullOrUndefined } from "util";
import { XMLEditor } from "../../../Serialization/XMLEditor";
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
                FileName: options.FileName || `${(Path.isAbsolute(options.Source) || options.Source.startsWith("..")) ? Path.basename(options.Source) : options.Source}.tar`
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

    public Serialize(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.Serialize());

        if (!isNullOrUndefined(this.Application))
        {
            editor.SetAttribute("application", this.Application);
        }

        return editor.Element;
    }
}