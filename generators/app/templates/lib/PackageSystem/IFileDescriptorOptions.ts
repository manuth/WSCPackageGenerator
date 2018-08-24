/**
 * Provides options for the `IFileDescriptor` class.
 */
export interface IFileDescriptorOptions
{
    /**
     * Gets or sets the path to load the file from.
     */
    Source: string;

    /**
     * Gets or sets the path to save the file to.
     */
    Destination?: string;
}