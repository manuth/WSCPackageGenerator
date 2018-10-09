import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";

/**
 * Provides options for the `ApplicationFileSystemInstruction` class.
 */
export interface IApplicationFileSystemInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * The application to upload the files to.
     */
    Application?: string;
}