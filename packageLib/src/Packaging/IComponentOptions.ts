import { Localizable } from "../Localization/Localizable";
import { IPersonOptions } from "./IPersonOptions";

/**
 * Provides options for the `IComponent` interface.
 */
export interface IComponentOptions
{
    /**
     * Gets the name of the component.
     */
    Name: string;

    /**
     * Gets the human-readable name of the component.
     */
    DisplayName?: Localizable;

    /**
     * Gets or sets the release-date of the component.
     */
    Date?: Date;

    /**
     * Gets the description of the component.
     */
    Description?: Localizable;

    /**
     * Gets the version of the component.
     */
    Version?: string;

    /**
     * Gets the author of the component.
     */
    Author?: IPersonOptions;

    /**
     * Gets or sets the license of the component.
     */
    License?: string;
}