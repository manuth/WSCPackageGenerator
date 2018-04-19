import Package from "../Package";
import Instruction from "./Instruction";

/**
 * Rerpesents a set of instructions.
 */
export default interface IInstructionCollection
{
    /**
     * The instructions which belong to this collection.
     */
    Instructions: Instruction[];

    /**
     * Gets or sets the directory inside the package to save the instruction-output to.
     */
    Destination?: string;
}