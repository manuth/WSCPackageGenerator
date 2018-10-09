import { ILocalization } from "../Globalization/ILocalization";

/**
 * Provides options for the `OptionItem` class.
 */
export interface IOptionItemOptions
{
    /**
     * The name of the item.
     */
    Name: string;

    /**
     * The human-readable name of the item.
     */
    DisplayName?: ILocalization;

    /**
     * The value of the item.
     */
    Value: any;
}