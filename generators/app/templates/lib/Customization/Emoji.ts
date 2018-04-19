import IEmoji from "./IEmoji";
import { isNullOrUndefined } from "util";

/**
 * Represents an emoji.
 * 
 * Please keep in mind to provide the files using a `FilesInstruction`.
 */
export default class Emoji implements IEmoji
{
    /**
     * The title of the emoji.
     */
    private title: string = "";

    /**
     * The name of the emoji.
     */
    private name: string = "";

    /**
     * The filename relative to the root of WoltLab Suite Core of the emoji.
     */
    private fileName: string = "";

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
    public constructor(options: IEmoji)
    {
        this.title = options.Title;
        this.name = options.Name;
        this.fileName = options.FileName;

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

    public get Title(): string
    {
        return this.title;
    }

    public set Title(value: string)
    {
        this.title = value;
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }

    public get HighResFileName(): string
    {
        return this.highResFileName;
    }

    public set HighResFileName(value: string)
    {
        this.highResFileName = value;
    }

    public get Aliases(): string[]
    {
        return this.aliases;
    }

    public get ShowOrder(): number
    {
        return this.showOrder;
    }

    public set ShowOrder(value: number)
    {
        this.showOrder = value;
    }
}