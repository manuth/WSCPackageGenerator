import { IInstructionOptions } from "./IInstructionOptions";

/**
 * Provides options for the `IDeleteInstruction<T>` interface.
 */
export interface IDeleteInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The objects to delete.
     */
    ObjectsToDelete?: T[];
}