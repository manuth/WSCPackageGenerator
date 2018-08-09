import Localizable from "../../GLobalization/Localizable";

/**
 * Provides options for the `IOptionItem` interface.
 */
export default interface IOptionItemOptions
{
    /**
     * Gets or sets the name of the item.
     */
    Name: string;

    /**
     * Gets the displayname of the item.
     */
    DisplayName?: Localizable;
    
    /**
     * Gets or sets the value of the item.
     */
    Value: any;
}