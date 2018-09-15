import { Localizable } from "../../GLobalization/Localizable";
import { OptionType } from "../../Options/ControlPanel/OptionType";
import { INodeOptions } from "../NodeSystem/INodeOptions";
import { IOptionItemOptions } from "./IOptionItemOptions";

/**
 * Provides options for the `Option` class.
 */
export interface IOptionOptions extends INodeOptions
{
    /**
     * The id of the option.
     */
    ID?: string;

    /**
     * The human readable name of the option.
     */
    DisplayName?: Localizable;

    /**
     * The description of the option.
     */
    Description?: Localizable;

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
     * A comma-separated list of options of which at least one needs to be enabled for the option to be shown.
     */
    Options?: string[];

    /**
     * A comma-separated list of options which should be visually enabled when this option is enabled.
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the selectoptions name followed by a colon (`:`, `U+003A`).
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