import { Localization } from "../Globalization/Localization";
import { INodeItem } from "../NodeSystem/INodeItem";

/**
 * Represents an option-category.
 */
export interface ICategory extends INodeItem
{
    /**
     * Gets the human-readable name of the category.
     */
    DisplayName: Localization;

    /**
     * Gets the description of the category.
     */
    Description: Localization;

    /**
     * Gets or sets a value for ordering the category.
     */
    ShowOrder: number;

    /**
     * Gets or sets the options of which at least one needs to be enabled for the category to be shown to the user.
     */
    EnableOptions: string[];
}