import { IDeleteInstruction } from "../Automation/IDeleteInstruction";
import { IFileInstructionOptions } from "../Automation/IFileInstructionOptions";
import { EventListener } from "./EventListener";

/**
 * Represents an instruction that provides a set of event-listeners.
 */
export interface IEventListenersInstructionOptions extends IFileInstructionOptions, IDeleteInstruction
{
    /**
     * Gets the event-listeners provided by the instruction.
     */
    EventListeners: EventListener[];
}