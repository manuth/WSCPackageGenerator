import { IComponentOptions } from "../../PackageSystem/IComponentOptions";
import { ImageFolderDescriptor } from "./ImageFolderDescriptor";

/**
 * Provides options for the `Style` class.
 */
export interface IStyleOptions extends IComponentOptions
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
     * Gets or sets the default cover-photo for user-profiles.
     */
    CoverPhoto?: string;

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