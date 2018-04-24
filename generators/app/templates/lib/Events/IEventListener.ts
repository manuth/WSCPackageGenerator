import IListener from "../IListener";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurrs.
 * 
 * Please note that you have to provide your PHP-files using a `FilesInstruction`.
 */
export default interface IEventListener extends IListener
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