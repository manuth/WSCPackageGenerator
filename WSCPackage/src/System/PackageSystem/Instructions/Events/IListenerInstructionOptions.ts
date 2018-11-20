import { INamedObject } from "../../../INamedObject";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";

/**
 * Provides options for the `ListenerInstruction` class.
 */
export interface IListenerInstructionOptions<T> extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The listeners provided by the instruction.
     */
    Listeners: T[];
}