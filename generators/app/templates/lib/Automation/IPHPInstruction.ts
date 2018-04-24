import IFileInstruction from "./IFileInstruction";

/**
 * Represents an instruction which provides a php-script execute when invoking the instruction.
 * 
 * Please keep in mind to provide the file using a `FilesInstruction`.
 */
export default interface IPHPInstruction extends IFileInstruction
{
    /**
     * Gets or sets the application attribute must have the same value as the application attribute
     * of the file package installation plugin instruction so that
     * the correct file in the intended application directory is executed.
     */
    Application?: string;
}