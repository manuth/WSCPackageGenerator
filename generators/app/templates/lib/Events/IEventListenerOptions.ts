import IListenerOptions from "../Core/IListenerOptions";

/**
 * Provides options for the `IEventListener` interface.
 */
export default interface IEventListenerOptions extends IListenerOptions
{
    /**
     * Gets or sets the name of the class that invokes the event to subscribe to.
     */
    ClassName: string;
    
    /**
     * Gets or sets a value indicating whether classes that inherit `className` should be subscribed, too.
     */
    Inherit?: boolean;
    
    /**
     * Gets or sets the name of the class that handles the subscribed event.
     */
    EventHandlerClassName: string;
}