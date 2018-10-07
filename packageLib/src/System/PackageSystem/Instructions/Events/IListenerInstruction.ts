import { Listener } from "../../../Events/Listener";
import { IInstruction } from "../IInstruction";

/**
 * Represents an instruction which provides listeners.
 */
export interface IListenerInstruction<T extends Listener> extends IInstruction
{
    /**
     * Gets the listeners provided by the instruction.
     */
    Listeners: T[];
}