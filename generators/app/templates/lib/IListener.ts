import Option from "./Options/ControlPanel/Option";
import WSCEnvironment from "./WSCEnvironment";

/**
 * Represents a component that listens to an event.
 */
export default interface IListener
{
    /**
     * Gets or sets the name of the listener.
     */
    Name: string;
    
    /**
     * Gets or sets the name of the event to subscribe to.
     */
    EventName: string;
    
    /**
     * Gets or sets the environment to add the subscription to.
     */
    Environment?: WSCEnvironment;
    
    /**
     * Gets or sets the options of which at least one must be enabled in order to execute the listener.
     */
    Options?: Option[];
    
    /**
     * Gets or sets the permissions of which the active user must have at least one in order to execute the listener.
     */
    Permissions?: string[];
    
    /**
     * Gets or sets a number indicating the execution order of the event-listener.
     */
    Order?: number;
}