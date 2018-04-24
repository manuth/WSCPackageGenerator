import IBBCodeAttribute from "./IBBCodeAttribute";
import { isNullOrUndefined } from "util";

/**
 * Represents an attribute of a bb-code.
 */
export default class BBCodeAttribute implements IBBCodeAttribute
{
    /**
     * A value indicating whether the attribute is required.
     */
    private required: boolean = false;

    /**
     * A value indicating if the value of the attribute - if not present - should be taken by the content of the bb-code.
     */
    private valueByContent: boolean = false;

    /**
     * The code that will be appended to the opening HTML-tag of the bb-code.
     * 
     * `%s` will be replaced by the value of the attribute.
     */
    private code: string = null;

    /**
     * A regex-pattern for validating the value of the attribute.
     */
    private validationPattern: RegExp = null;

    /**
     * Initializes a new instance of the `BBCodeAttribute` class.
     */
    public constructor(options: IBBCodeAttribute)
    {
        if (!isNullOrUndefined(options.Required))
        {
            this.required = options.Required;
        }

        if (!isNullOrUndefined(options.ValueByContent))
        {
            this.valueByContent = options.ValueByContent;
        }

        if (!isNullOrUndefined(options.Code))
        {
            this.code = options.Code;
        }

        if (!isNullOrUndefined(options.ValidationPattern))
        {
            this.validationPattern = options.ValidationPattern;
        }
    }

    public get Required(): boolean
    {
        return this.required;
    }
    
    public set Required(value: boolean)
    {
        this.Required = value;
    }

    public get ValueByContent(): boolean
    {
        return this.valueByContent;
    }

    public set ValueByContent(value: boolean)
    {
        this.valueByContent = value;
    }

    public get Code(): string
    {
        return this.code;
    }

    public set Code(value: string)
    {
        this.code = value;
    }

    public get ValidationPattern(): RegExp
    {
        return this.validationPattern;
    }

    public set ValidationPattern(value: RegExp)
    {
        this.validationPattern = value;
    }
}