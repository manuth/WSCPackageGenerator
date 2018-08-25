import { Instruction } from "./Instruction";

/**
 * Provides options for the `InstructionSet` class.
 */
export interface IInstructionSetOptions
{
    /**
     * The directory to save the components of this set.
     */
    Directory?: string;

    /**
     * The instructions of the instruction-set.
     */
    Instructions: Instruction[];
}