import IInstruction from "./IInstruction";

/**
 * Represents an instruction that is bound to a file.
 */
export default interface IFileInstruction extends IInstruction
{
    /**
     * Gets or sets the filename of the ouput of the instruction.
     */
    FileName?: string;
}