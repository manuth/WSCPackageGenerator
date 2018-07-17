import IFileSystemInstruction from "../../Automation/IFileSystemInstruction";

/**
 * Represents the description of an image-folder.
 */
export default interface IImageFolderDescriptor extends IFileSystemInstruction
{
    /**
     * Gets or sets the directory to upload the pictures to.
     */
    DestinationRoot?: string;
}