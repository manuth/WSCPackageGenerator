import IInstructionCollection from "./IInstructionCollection";
import Instruction from "./Instruction";

/**
 * Represents a set of `Instruction`s for updating a package.
 */
export default interface IUpdateInstructionCollection<T extends Instruction> extends IInstructionCollection<T>
{
    /**
     * Gets or sets the version of the package this `UpdateInstructionCollection` can be executed on.
     */
    FromVersion: string;
}