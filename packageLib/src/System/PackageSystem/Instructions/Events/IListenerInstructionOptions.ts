import { IInstructionOptions } from "../IInstructionOptions";

/**
 * Provides options for the `ListenerInstruction` class.
 */
export interface IListenerInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The listeners provided by the instruction.
     */
    Listeners: T[];
}