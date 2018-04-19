import Instruction from "./Automation/Instruction";
import EventListener from "./EventListener";
import FileInstruction from "./Automation/FileInstruction";
import { isNull } from "util";

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

        if (isNull(this.FileName))
        {
            this.FileName = "eventListeners.xml";
        }

        if (!isNull(options.ObjectsToDelete))
        {
            this.names.push(...options.ObjectsToDelete);
        }

        if (!isNull(options.EventListeners))
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
    public get ObjectsToDelete(): string[]
    {
        return this.names;
    }
}