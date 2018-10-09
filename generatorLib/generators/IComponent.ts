/**
 * Represents a component.
 */
export interface IComponent
{
    /**
     * The id of the component.
     */
    ID: string;

    /**
     * The human readable name.
     */
    DisplayName: string;

    /**
     * The prompt that is shown when asking for a file-name.
     */
    Message: string;

    /**
     * The template file to copy to the desired file.
     */
    TemplateFile?: string;

    /**
     * The default file-name.
     */
    DefaultFileName?: string;
}