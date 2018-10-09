import { ILocalization } from "../Globalization/ILocalization";
import { IOptionItemOptions } from "./IOptionItemOptions";
import { OptionType } from "./OptionType";

/**
 * Provides options for the `Option` class.
 */
export interface IOptionOptions
{
    /**
     * The id of the option.
     */
    ID?: string;

    /**
     * The name of the option.
     */
    Name: string;

    /**
     * The human readable name of the option.
     */
    DisplayName?: ILocalization;

    /**
     * The description of the option.
     */
    Description?: ILocalization;

    /**
     * The type of the option.
     */
    Type?: OptionType | string;

    /**
     * The default value of the option.
     */
    DefaultValue?: any;

    /**
     * The show-order of the option.
     */
    ShowOrder?: number;

    /**
     * The validation-pattern of the option.
     */
    ValidationPattern?: RegExp;

    /**
     * The items of the option.
     */
    Items?: IOptionItemOptions[];

    /**
     * A list of options of which at least one needs to be enabled for the option to be shown.
     */
    Options?: string[];

    /**
     * A list of options which should be visually enabled when this option is enabled.
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the name of the `selectoption`s followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.
     * It does not have an effect on the server side processing of the option.
     */
    EnableOptions?: string[];

    /**
     * Additional properties of the option.
     */
    AdditionalProperties?: { [key: string]: any };
}