import { ImageFolderDescriptor } from "./ImageFolderDescriptor";
import { ThemeInstruction } from "./ThemeInstruction";

/**
 * Represents a theme for WoltLab Suite Core.
 */
export interface ITheme
{
    /**
     * Gets or sets the instruction this theme belongs to.
     */
    Instruction: ThemeInstruction;

    /**
     * Gets or sets the filename of the thumbnail of the theme.
     */
    Thumbnail: string;

    /**
     * Gets or sets the filename of the high-resolution version of the thumbnanil of the theme.
     */
    HighResThumbnail: string;

    /**
     * Gets or sets the default cover-photo for user-profiles.
     */
    CoverPhoto: string;

    /**
     * Gets or sets the root of the images provided by this theme.
     */
    Images: ImageFolderDescriptor;

    /**
     * Gets or sets the variables of the theme.
     */
    Variables: object;

    /**
     * Gets or sets the scss-code provided by this theme.
     */
    CustomScss: string;

    /**
     * Gets or sets the scss-code provided by this theme that is used
     * for overwriting variables originally provided by WoltLab Suite Core.
     */
    OverrideScss: string;
}