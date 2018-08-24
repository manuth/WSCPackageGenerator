import INodeOptions from "../../Nodes/INodeOptions";
import Localizable from "../../GLobalization/Localizable";
import OptionItem from "./OptionItem";
import { OptionType } from "./OptionType";

/**
 * Provides options for the `IOption` interface.
 */
export default interface IOptionOptions extends INodeOptions
{
    /**
     * Gets or sets the id of the option.
     */
    ID: string;

    /**
     * Gets the displayname of the option.
     */
    DisplayName?: Localizable;

    /**
     * Gets the description of the option.
     */
    Description?: Localizable;

    /**
     * Gets the default value of the option.
     */
    Default?: any;

    /**
     * Gets or sets the type of the option.
     */
    Type?: OptionType;

    /**
     * Gets or sets a value indicating whether localization is supported.
     */
    SupportsLocalization?: boolean;

    /**
     * Gets or sets a value indicating whether this option is localized.
     */
    RequiresLocalization?: boolean;

    /**
     * Gets the items of the option.
     */
    Items?: OptionItem[];

    /**
     * Gets a comma-separated list of options which should be visually enabled when this option is enabled.  
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.  
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the selectoptions name followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.  
     * It does not have an effect on the server side processing of the option.
     */
    EnableOptions?: string[];
}