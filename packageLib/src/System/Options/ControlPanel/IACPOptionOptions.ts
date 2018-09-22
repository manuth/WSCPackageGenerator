import { IOptionOptions } from "../IOptionOptions";

/**
 * Provides options for the `Option` class.
 */
export interface IACPOptionOptions extends IOptionOptions
{
    /**
     * A value indicating whether the option is visible.
     */
    Visible?: boolean;

    /**
     * A value indicating whether the option is localizable.
     */
    Localizable?: boolean;

    /**
     * A value indicating whether to force localization.
     */
    ForceLocalization?: boolean;
}