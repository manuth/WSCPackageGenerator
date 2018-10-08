import { InstructionSet } from "./InstructionSet";

/**
 * Represents a step of a package-installation.
 */
export interface IInstruction
{
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
     * Gets all identifiable objects.
     */
    ObjectsByID: { [id: string]: any };

    /**
     * Serializes the instruction to an xml dom-document.
     */
    Serialize(): Element;
}