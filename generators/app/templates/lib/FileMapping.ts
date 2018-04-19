import { isNull } from "util";

/**
 * Represents a set of files to provide to WoltLab Suite Core.
 */
export default class FileMapping
{
    /**
     * The root of the files that are to be provided.
     */
    private sourceRoot: string = null;

    /**
     * The application to provide the files for.
     */
    private application: string = "";

    /**
     * Initializes a new instance of the `FileMapping` class.
     */
    public constructor(options: Partial<FileMapping> = { })
    {
        if (!isNull(options.SourceRoot))
        {
            this.sourceRoot = options.SourceRoot;
        }

        if (!isNull(options.Application))
        {
            this.application = options.Application;
        }
    }

    /**
     * Gets or sets the root of the files that are to be provided.
     */
    public get SourceRoot(): string
    {
        return this.sourceRoot;
    }

    public set SourceRoot(value: string)
    {
        this.sourceRoot = value;
    }

    /**
     * Gets or sets the application to provide the files for.
     */
    public get Application(): string
    {
        return this.application;
    }

    public set Application(value: string)
    {
        this.application = value;
    }
}