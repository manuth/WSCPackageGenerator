import BBCodeAttribute from "./BBCodeAttribute";
import Localizable from "../../Globalization/Localizable";

/**
 * Represents a bb-code.
 */
export default interface IBBCode
{
    /**
     * Gets or sets the name of the bb-code.
     */
    Name: string;

    /**
     * Gets or sets the display-name of the bb-code.
     */
    DisplayName?: Localizable;

    /**
     * Gets or sets the name of a font-awesome icon for the bb-code button.
     */
    Icon?: string;

    /**
     * Gets or sets a class which provides the functionality to parse the bb-code.
     * 
     * Please keep in mind to provide the PHP-script using a `FilesInstruction`.
     */
    ClassName?: string;

    /**
     * Gets or sets the content of the opening HTML-tag.
     */
    OpeningTag?: string;

    /**
     * Gets or sets the content of the closing HTML-tag.
     */
    ClosingTag?: string;

    /**
     * A value indicating whether the bb-code is inline-element.
     */
    IsInline?: boolean;

    /**
     * Gets or sets a value whether BBCodes are converted.
     */
    IsBBCode?: boolean;

    /**
     * Gets or sets the attributes of the bb-code.
     */
    Attributes?: BBCodeAttribute[];
}