import { ILocalization } from "../Globalization/ILocalization";

/**
 * Provides options for the `Category` class.
 */
export interface ICategoryOptions<T>
{
    /**
     * The human-readable name of the category.
     */
    DisplayName?: ILocalization;

    /**
     * The description of the category.
     */
    Description?: ILocalization;

    /**
     * A value for ordering the category.
     */
    ShowOrder?: number;

    /**
     * The options of the category.
     */
    Options: T[];
}