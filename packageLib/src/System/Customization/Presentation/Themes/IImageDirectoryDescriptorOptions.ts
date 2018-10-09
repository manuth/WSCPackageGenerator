import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions";

/**
 * Provides options for the `ImageDirectoryDescriptor` class.
 */
export interface IImageDirectoryDescriptorOptions extends Partial<IFileDescriptorOptions>
{
    /**
     * The directory to load the pictures from.
     */
    Source: string;

    /**
     * The directory to upload the pictures to.
     */
    DestinationRoot?: string;

    /**
     * The filename of the archive to compress the pictures to.
     */
    FileName?: string;
}