import { ENGINE_METHOD_CIPHERS } from "constants";
import { isNullOrUndefined } from "util";

/**
 * Represents an emoji.
 * 
 * Please keep in mind to provide the files using `Package.FileMappings`.
 */
export default class Emoji
{
    /**
     * The name of the emoji.
     */
    private name: string = '';

    /**
     * The filename relative to the root of WoltLab Suite Core of the emoji.
     */
    private fileName: string = '';

    /**
     * The filename relative to the root of WoltLab Suite Core of the high-resolution emoji.
     */
    private highResFileName: string = null;

    /**
     * The aliases of the emoji.
     */
    private aliases: string[] = [];

    /**
     * A value indicating at which position the emoji is displayed.
     */
    private showOrder: number = null;

    /**
     * Initializes a new instance of the `Emoji` class.
     */
    public constructor(options: Partial<Emoji> = { })
    {
        if (!isNullOrUndefined(options.Name))
        {
            this.name = options.Name;
        }

        if (!isNullOrUndefined(options.FileName))
        {
            this.fileName = options.FileName;
        }

        if (!isNullOrUndefined(options.HighResFileName))
        {
            this.highResFileName = options.HighResFileName;
        }

        if (!isNullOrUndefined(options.Aliases))
        {
            this.aliases.push(...options.Aliases);
        }

        if (!isNullOrUndefined(options.ShowOrder))
        {
            this.showOrder = options.ShowOrder;
        }
    }

    /**
     * Gets or sets the name of the emoji.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets or sets the filename relative to the root of WoltLab Suite Core of the emoji.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }

    /**
     * Gets or sets the filename relative to the root of WoltLab Suite Core of the high-resolution emoji.
     */
    public get HighResFileName(): string
    {
        return this.highResFileName;
    }

    public set HighResFileName(value: string)
    {
        this.highResFileName = value;
    }

    /**
     * Gets the aliases of the emoji.
     */
    public get Aliases(): string[]
    {
        return this.aliases;
    }

    /**
     * Gets or sets a value indicating at which position the emoji is displayed.
     */
    public get ShowOrder(): number
    {
        return this.showOrder;
    }

    public set ShowOrder(value: number)
    {
        this.showOrder = value;
    }
}