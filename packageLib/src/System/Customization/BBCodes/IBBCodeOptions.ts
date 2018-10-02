import { ILocalization } from "../../Globalization/ILocalization";
import { IBBCodeAttributeOptions } from "./IBBCodeAttributeOptions";

export interface IBBCodeOptions
{
    /**
     * The name of the bb-code.
     */
    Name: string;

    /**
     * The human-readable name of the bb-code.
     */
    DisplayName?: ILocalization;

    /**
     * The name of a font-awesome icon for the bb-code-button.
     */
    Icon?: string;

    /**
     * The class-name of the bb-code.
     */
    ClassName?: string;

    /**
     * The name of the opening HTML-tag.
     */
    OpeningTag?: string;

    /**
     * The name of the closing HTML-tag.
     */
    ClosingTag?: string;

    /**
     * A value indicating whether the bb-code is a block-element.
     */
    IsBlockElement?: boolean;

    /**
     * A value indicating whether the content of the bb-code should be parsed.
     */
    ParseContent?: boolean;

    /**
     * The attributes of the bb-code.
     */
    Attributes?: IBBCodeAttributeOptions[];
}