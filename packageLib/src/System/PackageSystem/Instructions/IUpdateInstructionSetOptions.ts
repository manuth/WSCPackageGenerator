import { IInstructionSetOptions } from "./IInstructionSetOptions";

/**
 * Provides options for the `UpdateInstructionSet` class.
 */
export interface IUpdateInstructionSetOptions extends IInstructionSetOptions
{
    /**
     * The version to update the package from.
     */
    FromVersion: string;
}