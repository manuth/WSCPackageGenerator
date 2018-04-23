/**
 * Represents an attribute of a bb-code.
 */
export default interface IBBCodeAttribute
{
    /**
     * Gets or sets a value indicating whether the attribute is required.
     */
    Required?: boolean;

    /**
     * Gets or sets a value indicating if the value of the attribute - if not present - should be taken by the content of the bb-code.
     */
    ValueByContent?: boolean;

    /**
     * Gets or sets the code that will be appended to the opening HTML-tag of the bb-code.
     * 
     * `%s` will be replaced by the value of the attribute.
     */
    Code?: string;

    /**
     * Gets or sets a regex-pattern for validating the value of the attribute.
     */
    ValidationPattern?: RegExp;
}