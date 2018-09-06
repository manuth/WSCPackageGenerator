import { IFileInstructionOptions } from "./IFileInstructionOptions";

/**
 * Provides options for the `IPHPInstruction` interface.
 */
export interface IPHPInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets or sets the name of the application to load the php-file from.
     */
    Application?: string;
}