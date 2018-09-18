import { ILocalizable } from "../../Globalization/ILocalizable";
import { IBBCodeAttributeOptions } from "./IBBCodeAttributeOptions";

export interface IBBCodeOptions
{
    /**
     * The name of the bbcode.
     */
    Name: string;

    /**
     * The huma;the bbcode.
     */
    DisplayName?: ILocalizable;

    /**
     * The name of a font-awesome icon for the bbcode-button.
     */
    Icon?: string;

    /**
     * The classname of the bbcode.
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
     * A value indicating whether the bbcode is a block-element.
     */
    IsBlockElement?: boolean;

    /**
     * A value indicating whether the content of the bbcode should be parsed.
     */
    ParseContent?: boolean;

    /**
     * The attributes of the bbcode.
     */
    Attributes?: IBBCodeAttributeOptions[];
}