import IEventListener from "./IEventListener";
import Listener from "../Listener";
import { isNullOrUndefined } from "util";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurrs.
 * 
 * Please note that you have to provide your PHP-files using a `FilesInstruction`.
 */
export default class EventListener extends Listener implements IEventListener
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
    public constructor(options: IEventListener)
    {
        super(options);

        if (!isNullOrUndefined(options.ClassName))
        {
            this.className = options.ClassName;
        }

        if (!isNullOrUndefined(options.Inherit))
        {
            this.inherit = options.Inherit;
        }

        if (!isNullOrUndefined(options.EventHandlerClassName))
        {
            this.eventHandlerClassName = options.EventHandlerClassName;
        }
    }

    public get ClassName(): string
    {
        return this.className;
    }

    public set ClassName(value: string)
    {
        this.className = value;
    }

    public get Inherit(): boolean
    {
        return this.inherit;
    }

    public set Inherit(value: boolean)
    {
        this.inherit = value;
    }

    public get EventHandlerClassName(): string
    {
        return this.eventHandlerClassName;
    }

    public set EventHandlerClassName(value: string)
    {
        this.eventHandlerClassName = value;
    }
}