import { IApplicationFileSystemInstructionOptions } from "./FileSystem/IApplicationFileSystemInstructionOptions";

/**
 * Provides options for the `SelfContainedPHPInstruction` class.
 */
export interface ISelfContainedPHPInstructionOptions extends IApplicationFileSystemInstructionOptions
{
    /**
     * The application to upload the file to.
     */
    Application?: string;

    /**
     * The path to load the php-file from.
     */
    Source: string;

    /**
     * The path to upload the php-file to.
     */
    Destination: string;
}