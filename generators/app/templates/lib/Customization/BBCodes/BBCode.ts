import BBCodeAttribute from "./BBCodeAttribute";
import IBBCode from "./IBBCode";
import Localizable from "../../Globalization/Localizable";
import TranslationNode from "../../Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents a bb-code.
 */
export default class BBCode implements IBBCode
{
    /**
     * The name of the bb-code.
     */
    private name: string = "";

    /**
     * The display-name of the bb-code.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The name of a font-awesome icon for the bb-code button.
     */
    private icon: string = null;

    /**
     * A class which provides the functionality to parse the bb-code.
     * 
     * Please keep in mind to provide the PHP-script using a `FilesInstruction`.
     */
    private className: string = null;

    /**
     * The content of the opening HTML-tag.
     */
    private openingTag: string = null;

    /**
     * The content of the closing HTML-tag.
     */
    private closingTag: string = null;

    /**
     * A value indicating whether the bb-code is an inline-element.
     */
    private isInline: boolean = true;

    /**
     * A value whether bb-codes inside this bb-code are converted.
     */
    private isBBCode: boolean = true;

    /**
     * The attributes of the bb-code.
     */
    private attributes: BBCodeAttribute[] = [];

    /**
     * Initializes a new instance of the `BBCode` class.
     */
    public constructor(options: IBBCode)
    {
        if (!isNullOrUndefined(options.Name))
        {
            this.name = options.Name;
        }

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.displayName, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Icon))
        {
            this.icon = options.Icon;
        }

        if (!isNullOrUndefined(options.ClassName))
        {
            this.className = options.ClassName;
        }

        if (!isNullOrUndefined(options.OpeningTag))
        {
            this.openingTag = options.OpeningTag;
        }

        if (!isNullOrUndefined(options.ClosingTag))
        {
            this.closingTag = options.ClosingTag;
        }

        if (!isNullOrUndefined(options.IsInline))
        {
            this.isInline = options.IsInline;
        }

        if (!isNullOrUndefined(options.IsBBCode))
        {
            this.isBBCode = options.IsBBCode;
        }

        if (!isNullOrUndefined(options.Attributes))
        {
            this.attributes.push(...options.Attributes);
        }
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    public get Icon(): string
    {
        return this.icon;
    }

    public set Icon(value: string)
    {
        this.icon = value;
    }

    public get ClassName(): string
    {
        return this.className;
    }

    public set ClassName(value: string)
    {
        this.className = value;
    }

    public get OpeningTag(): string
    {
        return this.openingTag;
    }

    public set OpeningTag(value: string)
    {
        this.openingTag = value;
    }

    public get ClosingTag(): string
    {
        return this.closingTag;
    }

    public set ClosingTag(value: string)
    {
        this.closingTag = value;
    }

    public get IsInline(): boolean
    {
        return this.isInline;
    }

    public set IsInline(value: boolean)
    {
        this.isInline = value;
    }

    public get IsBBCode(): boolean
    {
        return this.isBBCode;
    }

    public set IsBBCode(value: boolean)
    {
        this.isBBCode = value;
    }

    public get Attributes(): BBCodeAttribute[]
    {
        return this.attributes;
    }
}