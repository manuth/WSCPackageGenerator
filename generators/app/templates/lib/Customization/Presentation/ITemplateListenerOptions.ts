import { IListenerOptions } from "../../Core/IListenerOptions";

/**
 * Provides options for the `ITemplateListener` interface.
 */
export interface ITemplateListenerOptions extends IListenerOptions
{
    /**
     * Gets or sets the name of the template to subscribe to.
     */
    TemplateName: string;

    /**
     * Gets or sets a **smarty**-code which is copied into the subscribed template.
     */
    Code: string;
}