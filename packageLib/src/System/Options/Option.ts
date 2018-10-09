import { isNullOrUndefined } from "util";
import { Localization } from "../Globalization/Localization";
import { ICategory } from "./ICategory";
import { IOptionOptions } from "./IOptionOptions";
import { OptionItem } from "./OptionItem";
import { OptionType } from "./OptionType";

/**
 * Represents an option.
 */
export abstract class Option
{
    /**
     * The id of the option.
     */
    private id: string = null;

    /**
     * The name of the option.
     */
    private name: string;

    /**
     * The human-readable name of the option.
     */
    private displayName: Localization = new Localization();

    /**
     * The description of the option.
     */
    private description: Localization = new Localization();

    /**
     * The category of the option.
     */
    private category: ICategory = null;

    /**
     * The type of the option.
     */
    private type: OptionType | string = OptionType.TextBox;

    /**
     * The default value of the option.
     */
    private defaultValue: any = null;

    /**
     * The show-order of the option.
     */
    private showOrder: number = null;

    /**
     * The validation-pattern of the option.
     */
    private validationPattern: RegExp = null;

    /**
     * The items of the option.
     */
    private items: OptionItem[] = [];

    /**
     * A list of options of which at least one needs to be enabled for the option to be shown.
     */
    private options: string[] = [];

    /**
     * A list of options which should be visually enabled when this option is enabled.
     *
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the name of the `selectoption`s followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.
     * It does not have an effect on the server side processing of the option.
     */
    private enableOptions: string[] = [];

    /**
     * A set of additional properties of the option.
     */
    private additionalProperties: { [key: string]: any } = {};

    /**
     * Initializes a new instance of the `Option` class.
     */
    public constructor(category: ICategory, options: IOptionOptions)
    {
        this.category = category;

        if (!isNullOrUndefined(options.ID))
        {
            this.ID = options.ID;
        }

        this.Name = options.Name;

        if (!isNullOrUndefined(options.DisplayName))
        {
            this.DisplayName.Data = options.DisplayName;
        }

        if (!isNullOrUndefined(options.Description))
        {
            this.Description.Data = options.Description;
        }

        if (!isNullOrUndefined(options.Type))
        {
            this.Type = options.Type;
        }

        if (!isNullOrUndefined(options.DefaultValue))
        {
            this.DefaultValue = options.DefaultValue;
        }

        if (!isNullOrUndefined(options.ShowOrder))
        {
            this.ShowOrder = options.ShowOrder;
        }

        if (!isNullOrUndefined(options.ValidationPattern))
        {
            this.ValidationPattern = options.ValidationPattern;
        }

        if (!isNullOrUndefined(options.Items))
        {
            for (let item of options.Items)
            {
                this.Items.push(new OptionItem(this, item));
            }
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.Options = options.Options;
        }

        if (!isNullOrUndefined(options.EnableOptions))
        {
            this.EnableOptions = options.EnableOptions;
        }

        if (!isNullOrUndefined(options.AdditionalProperties))
        {
            this.AdditionalProperties = options.AdditionalProperties;
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
     * Gets or sets the name of the option.
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
     * Gets the human-readable name of the option.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets the description of the option.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets the category of the option.
     */
    public get Category(): ICategory
    {
        return this.category;
    }

    /**
     * Gets or sets the type of the option.
     */
    public get Type(): OptionType | string
    {
        return this.type;
    }

    public set Type(value: OptionType | string)
    {
        this.type = value;
    }

    /**
     * Gets or sets the default value of the option.
     */
    public get DefaultValue(): any
    {
        return this.defaultValue;
    }

    public set DefaultValue(value: any)
    {
        this.defaultValue = value;
    }

    /**
     * Gets or sets the show-order of the option.
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
     * Gets or sets the validation-pattern of the option.
     */
    public get ValidationPattern(): RegExp
    {
        return this.validationPattern;
    }

    public set ValidationPattern(value: RegExp)
    {
        this.validationPattern = value;
    }

    /**
     * Gets the items of the option.
     */
    public get Items(): OptionItem[]
    {
        return this.items;
    }

    /**
     * Gets or sets a list of options of which at least one needs to be enabled for the option to be shown.
     */
    public get Options(): string[]
    {
        return this.options;
    }

    public set Options(value: string[])
    {
        this.options = value;
    }

    /**
     * Gets or sets a list of options which should be visually enabled when this option is enabled.
     *
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the name of the `selectoption`s followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.
     * It does not have an effect on the server side processing of the option.
     */
    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }

    public set EnableOptions(value: string[])
    {
        this.enableOptions = value;
    }

    /**
     * Gets or sets a set of additional properties of the option.
     */
    public get AdditionalProperties(): { [key: string]: any }
    {
        return this.additionalProperties;
    }

    public set AdditionalProperties(value: { [key: string]: any })
    {
        this.additionalProperties = value;
    }
}