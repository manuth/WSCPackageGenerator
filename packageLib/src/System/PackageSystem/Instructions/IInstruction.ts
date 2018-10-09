import { InstructionSet } from "./InstructionSet";

/**
 * Represents a step of a package-installation.
 */
export interface IInstruction
{
    /**
     * Gets the name of the type of the instruction.
     */
    Type: string;

    /**
     * Gets or sets the package this instruction belongs to.
     */
    Collection: InstructionSet;

    /**
     * Gets the directory to save the instruction to.
     */
    DestinationRoot: string;

    /**
     * Gets or sets the name of the file to save the compiled instruction to.
     */
    FileName: string;

    /**
     * Gets the full name of the file.
     */
    FullName: string;

    /**
     * Gets or sets a value indicating whether the instruction should be executed in standalone-mode.
     */
    Standalone: boolean;

    /**
     * Gets all identifiable objects.
     */
    ObjectsByID: { [id: string]: any };
}