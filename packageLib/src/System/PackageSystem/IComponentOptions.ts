import { ILocalization } from "../Globalization/ILocalization";
import { IPersonOptions } from "./IPersonOptions";

/**
 * Provides options for the `Component` class.
 */
export interface IComponentOptions
{
    /**
     * The name of the package.
     */
    Name: string;

    /**
     * The human-readable name of the component.
     */
    DisplayName: ILocalization;

    /**
     * The version of the component.
     */
    Version: string;

    /**
     * The author of the component.
     */
    Author?: IPersonOptions;

    /**
     * The creation-date of the component.
     */
    CreationDate?: Date;

    /**
     * The description of the component.
     */
    Description?: ILocalization;

    /**
     * The license of the component.
     */
    License?: string;
}