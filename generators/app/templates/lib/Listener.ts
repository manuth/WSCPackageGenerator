import IListener from "./IListener";
import Option from "./Options/ControlPanel/Option";
import WSCEnvironment from "./WSCEnvironment";
import { isNullOrUndefined } from "util";

/**
 * Represents a component that listens to an event.
 */
export default class Listener implements IListener
{
    /**
     * The name of the listener.
     */
    private name: string = null;

    /**
     * The name of the event to subscribe to.
     */
    private eventName: string = "";
    
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
    public constructor(options: IListener)
    {
        this.name = options.Name;
        this.eventName = options.EventName;

        if (!isNullOrUndefined(options.Environment))
        {
            this.environment = options.Environment;
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.options.push(...options.Options);
        }

        if (!isNullOrUndefined(options.Permissions))
        {
            this.permissions.push(...options.Permissions);
        }

        if (!isNullOrUndefined(options.Order))
        {
            this.order = options.Order;
        }
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get EventName(): string
    {
        return this.eventName;
    }

    public set EventName(value: string)
    {
        this.eventName = value;
    }

    public get Environment(): WSCEnvironment
    {
        return this.environment;
    }

    public set Environment(value: WSCEnvironment)
    {
        this.environment = value;
    }

    public get Options(): Option[]
    {
        return this.options;
    }

    public set Options(value: Option[])
    {
        this.options = value;
    }

    public get Permissions(): string[]
    {
        return this.permissions;
    }

    public set Permissions(value: string[])
    {
        this.permissions = value;
    }

    public get Order(): number
    {
        return this.order;
    }

    public set Order(value: number)
    {
        this.order = value;
    }
}