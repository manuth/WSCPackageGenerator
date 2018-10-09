import { IListenerOptions } from "../../Events/IListenerOptions";

/**
 * Provides options for the `TemplateListener` class.
 */
export interface ITemplateListenerOptions extends IListenerOptions
{
    /**
     * The name of the template to listen to.
     */
    TemplateName: string;

    /**
     * The code to insert when the event is executed.
     */
    Code: string;
}