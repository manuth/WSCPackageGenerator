import IFileDescriptorOptions from "./IFileDescriptorOptions";
import { isNullOrUndefined } from "util";
import IFileDescriptor from "./IFileDescriptor";

/**
 * Represents the description of file.
 */
export default class FileDescriptor implements IFileDescriptor
{
    /**
     * The path to load the file from.
     */
    private source: string;

    /**
     * The path to save the file to.
     */
    private destination: string;

    /**
     * Initializes a new instance of the `FileDescriptor` class.
     */
    public constructor(options: IFileDescriptorOptions)
    {
        this.source = options.Source;

        if (isNullOrUndefined(options.Destination))
        {
            this.destination = options.Source;
        }
        else
        {
            this.destination = options.Destination;
        }
    }

    public get Source(): string
    {
        return this.source;
    }

    public set Source(value: string)
    {
        this.source = value;
    }

    public get Destination(): string
    {
        return this.destination;
    }

    public set Destination(value: string)
    {
        this.destination = value;
    }
}