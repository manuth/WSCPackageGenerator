import Package from "../Package";
import IInstruction from "./IInstruction";
import Instruction from "./Instruction";

/**
 * Rerpesents a set of instructions.
 */
export default interface IInstructionCollection<T extends IInstruction>
{
    /**
     * The instructions which belong to this collection.
     */
    Instructions: T[];

    /**
     * Gets or sets the directory inside the package to save the instruction-output to.
     */
    Destination?: string;
}