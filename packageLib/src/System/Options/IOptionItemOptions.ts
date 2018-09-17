import { Localizable } from "../Globalization/Localizable";

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
    DisplayName?: Localizable;

    /**
     * The value of the item.
     */
    Value: any;
}