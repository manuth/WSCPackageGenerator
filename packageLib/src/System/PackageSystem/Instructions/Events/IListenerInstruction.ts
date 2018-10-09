import { Listener } from "../../../Events/Listener";
import { INamedDeleteInstruction } from "../INamedDeleteInstruction";

/**
 * Represents an instruction which provides listeners.
 */
export interface IListenerInstruction<T extends Listener> extends INamedDeleteInstruction
{
    /**
     * Gets the listeners provided by the instruction.
     */
    Listeners: T[];
}