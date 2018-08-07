import FileSystemInstruction from "../../Automation/FileSystemInstruction";
import IImageFolderDescriptor from "./IImageFolderDescriptor";

/**
 * Represents the description of an image-folder.
 */
export default class ImageFolderDescriptor extends FileSystemInstruction implements IImageFolderDescriptor
{
    /**
     * The folder to upload the images to.
     */
    private destinationRoot: string;

    /**
     * Initializes a new instance of the `ImageFolderDescriptor` class.
     */
    public constructor(options: IImageFolderDescriptor)
    {
        super(options);

        if (options.DestinationRoot)
        {
            this.destinationRoot = options.DestinationRoot;
        }
        else
        {
            this.destinationRoot = this.SourceRoot;
        }

        if (!options.FileName)
        {
            this.FileName = "images.tar";
        }
    }

    /**
     * Gets or sets the folder to upload the images to.
     */
    public get DestinationRoot(): string
    {
        return this.destinationRoot;
    }

    public set DestinationRoot(value: string)
    {
        this.destinationRoot = value;
    }
}