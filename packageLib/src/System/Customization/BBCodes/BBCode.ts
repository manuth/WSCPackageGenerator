import { isNullOrUndefined } from "util";
import { Localization } from "../../Globalization/Localization";
import { BBCodeAttribute } from "./BBCodeAttribute";
import { IBBCodeOptions } from "./IBBCodeOptions";

/**
 * Represents a bb-code.
 */
export class BBCode
{
    /**
     * The name of the bb-code.
     */
    private name: string;

    /**
     * The human-readable name of the bb-code.
     */
    private displayName: Localization = new Localization();

    /**
     * The name of a font-awesome icon for the bb-code-button.
     */
    private icon: string = null;

    /**
     * The class-name of the bb-code.
     */
    private className: string = null;

    /**
     * The name of the opening HTML-tag.
     */
    private openingTag: string = null;

    /**
     * The name of the closing HTML-tag.
     */
    private closingTag: string = null;

    /**
     * A value indicating whether the bb-code is a block-element.
     */
    private isBlockElement: boolean = true;

    /**
     * A value indicating whether the content of the bb-code should be parsed.
     */
    private parseContent: boolean = false;

    /**
     * The attributes of the bb-code.
     */
    private attributes: BBCodeAttribute[] = [];

    /**
     * Initializes a new instance of the `BBCode` class.
     */
    public constructor(options: IBBCodeOptions)
    {
        this.Name = options.Name;

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName.Data, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Icon))
        {
            this.Icon = options.Icon;
        }

        if (!isNullOrUndefined(options.ClassName))
        {
            this.ClassName = options.ClassName;
        }

        if (!isNullOrUndefined(options.OpeningTag))
        {
            this.OpeningTag = options.OpeningTag;
        }

        if (!isNullOrUndefined(options.ClosingTag))
        {
            this.ClosingTag = options.ClosingTag;
        }

        if (!isNullOrUndefined(options.IsBlockElement))
        {
            this.IsBlockElement = options.IsBlockElement;
        }

        if (!isNullOrUndefined(options.ParseContent))
        {
            this.ParseContent = options.ParseContent;
        }

        if (!isNullOrUndefined(options.Attributes))
        {
            for (let attribute of options.Attributes)
            {
                this.Attributes.push(new BBCodeAttribute(attribute));
            }
        }
    }

    /**
     * Gets or sets the name of the bb-code.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets the human-readable name of the bb-code.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets or sets the name of a font-awesome icon for the bb-code-button.
     */
    public get Icon(): string
    {
        return this.icon;
    }

    public set Icon(value: string)
    {
        this.icon = value;
    }

    /**
     * Gets or sets the class-name of the bb-code.
     */
    public get ClassName(): string
    {
        return this.className;
    }

    public set ClassName(value: string)
    {
        this.className = value;
    }

    /**
     * Gets or sets the name of the opening HTML-tag.
     */
    public get OpeningTag(): string
    {
        return this.openingTag;
    }

    public set OpeningTag(value: string)
    {
        this.openingTag = value;
    }

    /**
     * Gets or sets the name of the closing HTML-tag.
     */
    public get ClosingTag(): string
    {
        return this.closingTag;
    }

    public set ClosingTag(value: string)
    {
        this.closingTag = value;
    }

    /**
     * Gets or sets a value indicating whether the bb-code is a block-element.
     */
    public get IsBlockElement(): boolean
    {
        return this.isBlockElement;
    }

    public set IsBlockElement(value: boolean)
    {
        this.isBlockElement = value;
    }

    /**
     * Gets or sets a value indicating whether the content of the bb-code should be parsed.
     */
    public get ParseContent(): boolean
    {
        return this.parseContent;
    }

    public set ParseContent(value: boolean)
    {
        this.parseContent = value;
    }

    /**
     * Gets the attributes of the bb-code.
     */
    public get Attributes(): BBCodeAttribute[]
    {
        return this.attributes;
    }
}