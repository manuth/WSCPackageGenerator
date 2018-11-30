/**
 * Provides options for the `BBCodeAttribute` class.
 */
export interface IBBCodeAttributeOptions
{
    /**
     * A value indicating whether the attribute is required.
     */
    Required?: boolean;

    /**
     * A value indicating if the value of the attribute - if not present - should be taken by the content of the bb-code.
     */
    ValueByContent?: boolean;

    /**
     * The code that will be appended to the opening HTML-tag of the bb-code.
     *
     * `%s` will be replaced by the value of the attribute.
     */
    Code?: string;

    /**
     * A regex-pattern for validating the value of the attribute.
     */
    ValidationPattern?: RegExp;
}