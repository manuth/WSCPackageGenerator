import Instruction from "./Automation/Instruction";
import EventListener from "./EventListener";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export default class EventListenersInstruction extends Instruction
{
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
}