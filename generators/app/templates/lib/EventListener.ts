import Listener from "./Listener";
import { isUndefined } from "util";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurrs.
 * 
 * Please note that you have to provide your PHP-files using `Package.FileMappings`.
 */
export default class EventListener extends Listener
{
    /**
     * The name of the class that invokes the event to subscribe to.
     */
    private className: string = "";

    /**
     * A value indicating whether classes that inherit `className` should be subscribed, too.
     */
    private inherit: boolean = false;

    /**
     * The name of the class that handles the subscribed event.
     */
    private eventHandlerClassName: string = "";

    /**
     * Initializes a new instance of the `EventListener` class.
     */
    public constructor(options: Partial<EventListener> = { })
    {
        super(options);

        if (!isUndefined(options.ClassName))
        {
            this.className = options.ClassName;
        }

        if (!isUndefined(options.Inherit))
        {
            this.inherit = options.Inherit;
        }
    }

    /**
     * Gets or sets the name of the class that invokes the event to subscribe to.
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
     * Gets or sets a value indicating whether classes that inherit `className` should be subscribed, too.
     */
    public get Inherit(): boolean
    {
        return this.inherit;
    }

    public set Inherit(value: boolean)
    {
        this.inherit = value;
    }

    /**
     * Gets or sets the name of the class that handles the subscribed event.
     */
    public get EventHandlerClassName(): string
    {
        return this.eventHandlerClassName;
    }

    public set EventHandlerClassName(value: string)
    {
        this.eventHandlerClassName = value;
    }
}