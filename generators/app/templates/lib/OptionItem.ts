import Option from "./Option";
import Localizable from "./Globalization/Localizable";
import Node from "./Node";

/**
 * Represents an item of an option.
 */
export default class OptionItem
{
    /**
     * The name of the item.
     */
    private name: string = '';

    /**
     * The value of the item.
     */
    private value: any = null;

    /**
     * The option this item belongs to.
     */
    private option: Option = null;

    /**
     * The displayname of the item.
     */
    private displayName: Localizable = new Localizable();

    /**
     * Initializes a new instance of the `OptionItem` class.
     */
    public constructor(options: Partial<OptionItem> = { })
    {
        if (options.Name)
        {
            this.name = options.Name;
        }

        if (options.Value)
        {
            this.value = options.Value;
        }

        if (options.Option)
        {
            this.option = options.Option;
        }

        if (options.DisplayName)
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }
    }

    /**
     * Gets or sets the name of the item.
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
     * Gets the displayname of the item.
     */
    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    /**
     * Gets the full name of the item.
     */
    public get FullName(): string
    {
        return [ this.Option.FullName, this.Name ].join('.');
    }

    /**
     * Gets or sets the value of the item.
     */
    public get Value(): any
    {
        return this.value;
    }

    public set Value(value: any)
    {
        this.value = value;
    }

    /**
     * Gets or sets the option this item belongs to.
     */
    public get Option(): Option
    {
        return this.option;
    }

    public set Option(value: Option)
    {
        this.option = value;
    }
}