import { IListenerOptions } from "./IListenerOptions";

/**
 * Provides options for the `EventListener` class.
 */
export interface IEventListenerOptions extends IListenerOptions
{
    /**
     * The name of the class to listen to.
     */
    ClassName: string;

    /**
     * A value indicating whether listening to the event thrown by a class inheriting from `className` is allowed.
     */
    AllowInherited?: boolean;

    /**
     * The name of the event-handler class which is triggered when the event has been executed.
     *
     * Please consider that the event-handler class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    EventHandlerClassName: string;
}