import EventListener from "./EventListener";
import IDeleteInstruction from "../Automation/IDeleteInstruction";
import IFileInstruction from "../Automation/IFileInstruction";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export default interface IEventListenersInstruction extends IFileInstruction, IDeleteInstruction
{
    /**
     * Gets the event-listeners provided by the instruction.
     */
    EventListeners: EventListener[];
}