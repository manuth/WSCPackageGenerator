import IComponent from "../../PackageSystem/IComponent";
import ImageFolderDescriptor from "./ImageFolderDescriptor";

/**
 * Represents a style-configuration.
 */
export default interface IStyle extends IComponent
{
    /**
     * Gets or sets the filename of the thumbnail of the style.
     */
    Thumbnail?: string;

    /**
     * Gets or sets the filename of the high-resolution version of the thumbnanil of the style.
     */
    HighResThumbnail?: string;

    /**
     * Gets or sets the root of the images provided by the style.
     */
    ImagesRoot?: ImageFolderDescriptor;

    /**
     * Gets or sets the filename of the json or js-file that contains variables.
     */
    VariableFile?: string;
    
    /**
     * Gets or sets the filename of the file that contains the custom scss-code.
     */
    CustomScssFile?: string;

    /**
     * Gets or sets the filename of the file that contains scss-code for overriding variables.
     */
    OverrideScssFile?: string;
}