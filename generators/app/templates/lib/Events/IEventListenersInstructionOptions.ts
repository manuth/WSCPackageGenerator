import EventListener from "./EventListener";
import IDeleteInstruction from "../Automation/IDeleteInstruction";
import IFileInstructionOptions from "../Automation/IFileInstructionOptions";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export default interface IEventListenersInstructionOptions extends IFileInstructionOptions, IDeleteInstruction
{
    /**
     * Gets the event-listeners provided by the instruction.
     */
    EventListeners: EventListener[];
}