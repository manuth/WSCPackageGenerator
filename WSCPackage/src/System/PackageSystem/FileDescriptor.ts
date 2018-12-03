import escapeStringRegexp = require("escape-string-regexp");
import * as Path from "path";
import UPath = require("upath");
import { isNullOrUndefined } from "util";
import { IFileDescriptorOptions } from "./IFileDescriptorOptions";

/**
 * Provides a description of a file.
 */
export class FileDescriptor
{
    /**
     * The path to load the file from.
     */
    private source: string;

    /**
     * The filename to save the file to.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the `FileDescriptor` class.
     */
    public constructor(options: IFileDescriptorOptions)
    {
        this.Source = Path.resolve(options.Source);

        if (isNullOrUndefined(options.FileName))
        {
            let fileName: string = Path.normalize(options.Source);

            if (
                Path.isAbsolute(fileName) ||
                (UPath.normalize(fileName).split(UPath.sep)[0] === ".."))
            {
                this.FileName = Path.basename(fileName);
            }
            else
            {
                this.FileName = fileName;
            }
        }
        else
        {
            this.FileName = options.FileName;
        }
    }

    /**
     * Gets or sets the path to load the file from.
     */
    public get Source(): string
    {
        return this.source;
    }

    public set Source(value: string)
    {
        this.source = value;
    }

    /**
     * Gets ort sets the filename to save the file to.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }
}