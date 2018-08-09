import IFileSystemInstructionOptions from "../Automation/IFileSystemInstructionOptions";

/**
 * Provides options for the `IFilesInstruction` interface.
 */
export default interface IFilesInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * Gets the application to provide the files to.
     */
    Application?: string;
}