import Node from "./Node";
import OptionType from "./OptionType";
import OptionItem from "./OptionItem";
import OptionItemCollection from "./Collections/OptionItemCollection";
import Localizable from "./GLobalization/Localizable";
import SettingsNode from "./SettingsNode";

/**
 * Represents an option that can be shown in the ACP.
 */
export default class Option extends Node
{
    /**
     * The displayname of the option.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The description of the option.
     */
    private description: Localizable = new Localizable();

    /**
     * The default value of the option.
     */
    private default: any;

    /**
     * The type of the option.
     */
    private type: OptionType;

    /**
     * The items of the option.
     */
    private items: OptionItem[] = new OptionItemCollection(this);

    /**
     * A comma-separated list of options which should be visually enabled when this option is enabled.  
     * A leading exclamation mark (`!`, U+0021) will disable the specified option when this option is enabled.  
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the selectoptions name followed by a colon (:, U+003A).
     *
     * This setting is a visual helper for the administrator only.  
     * It does not have an effect on the server side processing of the option.
     */
    private enableOptions: string[] = [];

    /**
     * Initializes a new instance of the `Option` class.
     */
    public constructor(options: Partial<Option> = { })
    {
        super(options);

        if (options.DisplayName)
        {
            Object.assign(this.displayName, options.DisplayName);
        }

        if (options.Description)
        {
            Object.assign(this.description, options.Description);
        }

        if (options.Default)
        {
            this.default = options.Default;
        }

        if (options.Type)
        {
            this.type = options.Type;
        }

        if (options.Items)
        {
            this.items.push(...options.Items);
        }

        if (options.EnableOptions)
        {
            this.enableOptions.push(...options.EnableOptions);
        }
    }

    /**
     * Gets the displayname of the option.
     */
    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    /**
     * Gets the full name of the node.
     */
    public get FullName(): string
    {
        return 'wcf.acp.option.' + super.FullName;
    }
    
    /**
     * Gets the description of the option.
     */
    public get Description(): Localizable
    {
        return this.description;
    }

    /**
     * Gets the default value of the option.
     */
    public get Default(): any
    {
        return this.default;
    }

    /**
     * Gets or sets the type of the option.
     */
    public get Type(): OptionType
    {
        return this.type;
    }

    public set Type(value: OptionType)
    {
        this.type = value;
    }

    /**
     * Gets the items of the option.
     */
    public get Items(): OptionItem[]
    {
        return this.items;
    }

    /**
     * Gets a comma-separated list of options which should be visually enabled when this option is enabled.  
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.  
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the selectoptions name followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.  
     * It does not have an effect on the server side processing of the option.
     */
    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }
}