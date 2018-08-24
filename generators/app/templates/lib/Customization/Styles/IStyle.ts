import { ImageFolderDescriptor } from "./ImageFolderDescriptor";
import { StyleInstruction } from "./StyleInstruction";

/**
 * Represents a style for WoltLab Suite Core.
 */
export interface IStyle
{
    /**
     * Gets or sets the instruction this style belongs to.
     */
    Instruction: StyleInstruction;

    /**
     * Gets or sets the filename of the thumbnail of the style.
     */
    Thumbnail: string;

    /**
     * Gets or sets the filename of the high-resolution version of the thumbnanil of the style.
     */
    HighResThumbnail: string;

    /**
     * Gets or sets the default cover-photo for user-profiles.
     */
    CoverPhoto: string;

    /**
     * Gets or sets the root of the images provided by this style.
     */
    Images: ImageFolderDescriptor;

    /**
     * Gets or sets the variables of the style.
     */
    Variables: object;

    /**
     * Gets or sets the scss-code provided by this style.
     */
    CustomScss: string;

    /**
     * Gets or sets the scss-code provided by this style that is used
     * for overwriting variables originally provided by WoltLab Suite Core.
     */
    OverrideScss: string;
}