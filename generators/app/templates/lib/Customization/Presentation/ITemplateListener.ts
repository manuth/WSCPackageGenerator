import IListener from "../../IListener";

/**
 * Represents a listener that subscribes to an event inside a template.
 */
export default interface ITemplateListener extends IListener
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