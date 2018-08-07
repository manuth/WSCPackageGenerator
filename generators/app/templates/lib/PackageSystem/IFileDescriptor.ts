/**
 * Represents the description of file.
 */
export default interface IFileDescriptor
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