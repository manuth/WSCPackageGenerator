import { isNullOrUndefined } from "util";
import { IListenerOptions } from "./IListenerOptions";
import { ListenerEnvironment } from "./ListenerEnvironment";

/**
 * Represents a component which listens to specific events.
 */
export abstract class Listener
{
    /**
     * The name of the listener.
     */
    private name: string;

    /**
     * The environment to install the listener to.
     */
    private environment: ListenerEnvironment = ListenerEnvironment.FrontEnd;

    /**
     * The name of the event to listen to.
     */
    private eventName: string;

    /**
     * A number indicating the execution order of the event-listener.
     */
    private executionOrder: number = null;

    /**
     * The permissions of which the active user must have at least one in order to execute the listener.
     */
    private permissions: string[] = [];

    /**
     * The options of which at least one must be enabled in order to execute the listener.
     */
    private options: string[] = [];

    /**
     * Initializes a new instance of the `Listener` class.
     */
    public constructor(options: IListenerOptions)
    {
        this.Name = options.Name;

        if (!isNullOrUndefined(options.Environment))
        {
            this.Environment = options.Environment;
        }

        this.EventName = options.EventName;

        if (!isNullOrUndefined(options.ExecutionOrder))
        {
            this.ExecutionOrder = options.ExecutionOrder;
        }

        if (!isNullOrUndefined(options.Permissions))
        {
            this.Permissions.push(...options.Permissions);
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.Options.push(...options.Options);
        }
    }

    /**
     * Gets or sets the name of the listener.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets or sets the environment to install the listener to.
     */
    public get Environment(): ListenerEnvironment
    {
        return this.environment;
    }

    public set Environment(value: ListenerEnvironment)
    {
        this.environment = value;
    }

    /**
     * Gets or sets the name of the event to listen to.
     */
    public get EventName(): string
    {
        return this.eventName;
    }

    public set EventName(value: string)
    {
        this.eventName = value;
    }

    /**
     * Gets or sets a number indicating the execution order of the event-listener.
     */
    public get ExecutionOrder(): number
    {
        return this.executionOrder;
    }

    public set ExecutionOrder(value: number)
    {
        this.executionOrder = value;
    }

    /**
     * Gets the permissions of which the active user must have at least one in order to execute the listener.
     */
    public get Permissions(): string[]
    {
        return this.permissions;
    }

    /**
     * Gets the options of which at least one must be enabled in order to execute the listener.
     */
    public get Options(): string[]
    {
        return this.options;
    }
}