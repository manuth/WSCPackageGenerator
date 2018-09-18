import { InstructionSet } from "./InstructionSet";

/**
 * Represents an instruction.
 */
export interface IInstruction
{
    /**
     * The name of the type of the instruction.
     */
    Type: string;

    /**
     * The package this instruction belongs to.
     */
    Collection: InstructionSet;

    /**
     * The directory to save the instruction to.
     */
    DestinationRoot: string;

    /**
     * The name of the file to save the compiled instruction to.
     */
    FileName: string;

    /**
     * The full name of the file.
     */
    FullName: string;

    /**
     * An xml-code which represents the instruction.
     */
    XML: string;
}