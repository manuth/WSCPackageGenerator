import NamedObjectDeletionInstruction from "./Automation/NamedObjectDeletionInstruction";

/**
 * Represents an instruction that deletes a set of event-listeners.
 */
export default class EventListenersDeletionInstruction extends NamedObjectDeletionInstruction
{
    /**
     * Initializes a new instance of the `EventListenersDeletionInstruction` class.
     */
    public constructor(options: Partial<EventListenersDeletionInstruction> = { })
    {
        super(options);
    }

    /**
     * Gets the names of the event-listeners to delete.
     */
    public get Names(): string[]
    {
        return super.Names;
    }
}