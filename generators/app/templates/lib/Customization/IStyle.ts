import Component from "../Component";
import IComponent from "../IComponent";

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
     * Gets or sets the root of the images provided by the style.
     */
    ImagesRoot?: string;
    
    /**
     * Gets or sets the filename of the file that contains the custom scss-code.
     */
    CustomScssFile?: string;

    /**
     * Gets or sets the filename of the file that contains scss-code for overriding variables.
     */
    OverrideScssFile?: string;
}