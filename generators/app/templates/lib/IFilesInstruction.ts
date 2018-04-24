import IFileSystemInstruction from "./Automation/IFileSystemInstruction";

/**
 * Represents an instruction which provides a set of files.
 */
export default interface IFilesInstruction extends IFileSystemInstruction
{
    /**
     * Gets the application to provide the files to.
     */
    Application?: string;
}