import { isNullOrUndefined } from "util";
import { IEmojiOptions } from "./IEmojiOptions";

/**
 * Represents an emoji.
 */
export class Emoji
{
    /**
     * The name of the emoji.
     */
    private name: string;

    /**
     * The human-readable name of the emoji.
     */
    private displayName: string;

    /**
     * The aliases of the emoji.
     */
    private aliases: string[] = [];

    /**
     * A value indicating at which position the emoji is displayed.
     */
    private showOrder: number = null;

    /**
     * The filename relative to the root of WoltLab Suite Core of the emoji.
     */
    private fileName: string;

    /**
     * The filename relative to the root of WoltLab Suite Core of the high-resolution emoji.
     */
    private highResFileName: string = null;

    /**
     * Initializes a new instance of the `Emoji` class.
     */
    public constructor(options: IEmojiOptions)
    {
        this.Name = options.Name;
        this.DisplayName = options.DisplayName;

        if (!isNullOrUndefined(options.Aliases))
        {
            this.Aliases.push(...options.Aliases);
        }

        if (!isNullOrUndefined(options.ShowOrder))
        {
            this.ShowOrder = options.ShowOrder;
        }

        this.FileName = options.FileName;

        if (!isNullOrUndefined(options.HighResFileName))
        {
            this.HighResFileName = options.HighResFileName;
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
     * Gets or sets the human-readable name of the emoji.
     */
    public get DisplayName(): string
    {
        return this.displayName;
    }

    public set DisplayName(value: string)
    {
        this.displayName = value;
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
}