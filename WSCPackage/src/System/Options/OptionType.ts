/**
 * Specifies a type of an option.
 */
export enum OptionType
{
    /**
     * Indicates a checkbox.
     */
    CheckBox = "boolean",

    /**
     * Indicates a list of check-boxes.
     */
    CheckBoxes = "checkboxes",

    /**
     * Indicates a text-box.
     */
    TextBox = "text",

    /**
     * Indicates a big text-box.
     */
    TextArea = "textarea",

    /**
     * Indicates a big text-box which is localizable.
     */
    LocalizableTextArea = "textareaI18n",

    /**
     * Indicates a secure text-box.
     */
    PasswordTextBox = "password",

    /**
     * Indicates a combo-box.
     */
    ComboBox = "select",

    /**
     * Indicates a set of radio-buttons.
     */
    RadioButton = "radioButton",

    /**
     * Indicates a multi-select list.
     */
    MultiSelect = "multiSelect"
}