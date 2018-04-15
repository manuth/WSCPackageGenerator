import Node from "./Node";
import OptionType from "./OptionType";
import OptionItem from "./OptionItem";
import OptionItemCollection from "./Collections/OptionItemCollection";
import Localizable from "./GLobalization/Localizable";
import SettingsNode from "./SettingsNode";
import { isUndefined } from "util";

/**
 * Represents an option that can be shown in the ACP.
 */
export default class Option extends Node
{
    /**
     * The id of the option.
     */
    private id: string = null;

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

        if (!isUndefined(options.ID))
        {
            this.id = options.ID;
        }

        if (!isUndefined(options.DisplayName))
        {
            Object.assign(this.displayName, options.DisplayName);
        }

        if (!isUndefined(options.Description))
        {
            Object.assign(this.description, options.Description);
        }

        if (!isUndefined(options.Default))
        {
            this.default = options.Default;
        }

        if (!isUndefined(options.Type))
        {
            this.type = options.Type;
        }

        if (!isUndefined(options.Items))
        {
            this.items.push(...options.Items);
        }

        if (!isUndefined(options.EnableOptions))
        {
            this.enableOptions.push(...options.EnableOptions);
        }
    }

    /**
     * Gets or sets the id of the option.
     */
    public get ID(): string
    {
        return this.id;
    }

    public set ID(value: string)
    {
        this.id = value;
    }

    /**
     * Gets the displayname of the option.
     */
    public get DisplayName(): Localizable
    {
        return this.displayName;
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