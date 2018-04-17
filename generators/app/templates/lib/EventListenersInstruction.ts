import Instruction from "./Automation/Instruction";
import EventListener from "./EventListener";
import FileInstruction from "./Automation/FileInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export default class EventListenersInstruction extends FileInstruction
{
    /**
     * A set of names of event-listeners to delete.
     */
    private names: string[] = [];

    /**
     * The event-listeners provided by the instruction.
     */
    private eventListeners: EventListener[] = [];

    /**
     * Initializes a new instance of the `EventListenersInstruction` class.
     */
    public constructor(options: Partial<EventListenersInstruction> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Names))
        {
            this.names.push(...options.Names);
        }

        if (!isNullOrUndefined(options.EventListeners))
        {
            this.eventListeners.push(...options.EventListeners);
        }
    }

    /**
     * Gets the event-listeners provided by the instruction.
     */
    public get EventListeners(): EventListener[]
    {
        return this.eventListeners;
    }

    /**
     * Gets a set of names of event-listeners to delete.
     */
    public get Names(): string[]
    {
        return this.names;
    }
}