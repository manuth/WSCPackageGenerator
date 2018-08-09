/**
 * Provides options for the `IImageFolderDescriptor` interface.
 */
export default interface IImageFolderDescriptorOptions
{
    /**
     * Gets or sets the directory to load the pictures from.
     */
    SourceRoot: string;

    /**
     * Gets or sets the directory to upload the pictures to.
     */
    DestinationRoot?: string;

    /**
     * Gets or sets the filename of the archive to compress the pictures to.
     */
    FileName?: string;
}