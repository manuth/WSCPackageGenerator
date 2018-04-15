import WSCEnvironment from "./WSCEnvironment";
import Option from "./Option";
import { isUndefined } from "util";

/**
 * Represents a component that listens to an event.
 */
export default class Listener
{
    /**
     * The name of the listener.
     */
    private name: string = null;

    /**
     * The name of the event to subscribe to.
     */
    private eventName: string = '';
    
    /**
     * The environment to add the subscription to.
     */
    private environment: WSCEnvironment = WSCEnvironment.Default;

    /**
     * The options of which at least one must be enabled in order to execute the listener.
     */
    private options: Option[] = [];

    /**
     * The permissions of which the active user must have at least one in order to execute the listener.
     */
    private permissions: string[] = [];

    /**
     * A number indicating the execution order of the event-listener.
     */
    private order: number = null;

    /**
     * Initializes a new instance of the `Listener` class.
     */
    public constructor(options: Partial<Listener> = { })
    {
        if (!isUndefined(options.Name))
        {
            this.name = options.Name;
        }
        
        if (!isUndefined(options.EventName))
        {
            this.eventName = options.EventName;
        }

        if (!isUndefined(options.Environment))
        {
            this.environment = options.Environment;
        }

        if (!isUndefined(options.Options))
        {
            this.options.push(...options.Options);
        }

        if (!isUndefined(options.Permissions))
        {
            this.permissions.push(...options.Permissions);
        }

        if (!isUndefined(options.Order))
        {
            this.order = options.Order;
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
     * Gets or sets the name of the event to subscribe to.
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
     * Gets or sets the environment to add the subscription to.
     */
    public get Environment(): WSCEnvironment
    {
        return this.environment;
    }

    public set Environment(value: WSCEnvironment)
    {
        this.environment = value;
    }

    /**
     * Gets or sets the options of which at least one must be enabled in order to execute the listener.
     */
    public get Options(): Option[]
    {
        return this.options;
    }

    public set Options(value: Option[])
    {
        this.options = value;
    }

    /**
     * Gets or sets the permissions of which the active user must have at least one in order to execute the listener.
     */
    public get Permissions(): string[]
    {
        return this.permissions;
    }

    public set Permissions(value: string[])
    {
        this.permissions = value;
    }

    /**
     * Gets or sets a number indicating the execution order of the event-listener.
     */
    public get Order(): number
    {
        return this.order;
    }

    public set Order(value: number)
    {
        this.order = value;
    }
}