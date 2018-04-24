import IPerson from "./IPerson";
import Localizable from "../GLobalization/Localizable";

export default interface IComponent
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
    Author?: IPerson;

    /**
     * Gets or sets the license of the component.
     */
    License?: string;
}