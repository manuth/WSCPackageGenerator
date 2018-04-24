import Localizable from "../../GLobalization/Localizable";

/**
 * Represents an item of an option.
 */
export default interface IOptionItem
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