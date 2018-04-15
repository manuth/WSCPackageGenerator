import Listener from "../Listener";
import { isNullOrUndefined } from "util";

/**
 * Represents a listener that subscribes to an event inside a template.
 */
export default class TemplateListener extends Listener
{
    /**
     * The name of the template to subscribe to.
     */
    private templateName: string = '';

    /**
     * This **smarty**-code is copied into the subscribed template.
     */
    private code: string = '';

    /**
     * Initializes a new instance of the `TemplateListener` class.
     */
    public constructor(options: Partial<TemplateListener> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.TemplateName))
        {
            this.templateName = options.TemplateName;
        }

        if (!isNullOrUndefined(options.Code))
        {
            this.code = options.Code;
        }
    }

    /**
     * Gets or sets the name of the template to subscribe to.
     */
    public get TemplateName(): string
    {
        return this.templateName;
    }

    public set TemplateName(value: string)
    {
        this.templateName = value;
    }

    /**
     * Gets or sets a **smarty**-code which is copied into the subscribed template.
     */
    public get Code(): string
    {
        return this.code;
    }

    public set Code(value: string)
    {
        this.code = value;
    }
}