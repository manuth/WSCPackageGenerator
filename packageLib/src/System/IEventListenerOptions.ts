/**
 * Provides options for the `EventListener` class.
 */
export interface IEventListenerOptions
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
     * The name of the eventhandler-class which is triggered when the event has been executed.
     *
     * Please consider that the eventhandler-class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    EventHandlerClassName: string;
}