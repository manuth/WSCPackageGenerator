import EventListener from "./EventListener";
import FileInstruction from "../Automation/FileInstruction";
import IEventListenersInstruction from "./IEventListenersInstruction";
import Instruction from "../Automation/Instruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export default class EventListenersInstruction extends FileInstruction implements IEventListenersInstruction
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
    public constructor(options: IEventListenersInstruction)
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "eventListeners.xml";
        }

        if (!isNullOrUndefined(options.ObjectsToDelete))
        {
            this.names.push(...options.ObjectsToDelete);
        }

        if (!isNullOrUndefined(options.EventListeners))
        {
            this.eventListeners.push(...options.EventListeners);
        }
    }

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