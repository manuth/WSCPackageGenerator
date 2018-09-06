import { IPersonOptions } from "./IPersonOptions";
import { Localizable } from "../GLobalization/Localizable";

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
     * The human-readabnle name of the component.
     */
    DisplayName: Localizable;

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
    Description?: Localizable;

    /**
     * The license of the component.
     */
    License?: string;
}