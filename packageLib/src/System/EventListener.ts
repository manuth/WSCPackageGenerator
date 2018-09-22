import { Listener } from "./Listener";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurrs.
 *
 * Please note that you have to provide your PHP-files using a `FilesInstruction`.
 */
export class EventListener extends Listener
{
    /**
     * The name of the class to listen to.
     */
    private className: string;

    /**
     * A value indicating whether listening to the event thrown by a class inheriting from `className` is allowed.
     */
    private allowInherited: boolean = false;

    /**
     * The name of the eventhandler-class which is triggered when the event has been executed.
     *
     * Please consider that the eventhandler-class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    private eventHandlerClassName: string;

    /**
     * Gets or sets the name of the class to listen to.
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
     * Gets or sets a value indicating whether listening to the event thrown by a class inheriting from `className` is allowed.
     */
    public get AllowInherited(): boolean
    {
        return this.allowInherited;
    }

    public set AllowInherit(value: boolean)
    {
        this.allowInherited = value;
    }

    /**
     * Gets or sets the name of the eventhandler-class which is triggered when the event has been executed.
     *
     * Please consider that the eventhandler-class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
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