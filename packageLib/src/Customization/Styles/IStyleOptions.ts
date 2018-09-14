import { Localizable } from "../../GLobalization/Localizable";
import { IComponentOptions } from "../../PackageSystem/IComponentOptions";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor";

/**
 * Provides options for the `Style` class.
 */
export interface IStyleOptions extends Partial<IComponentOptions>
{
    Name: string;

    DisplayName: Localizable;

    /**
     * The thumbnail of the theme.
     */
    Thumbnail?: string;

    /**
     * The high resolution version of the thumbnail.
     */
    HighResThumbnail?: string;

    /**
     * The path to the default cover-photo for user-profiles.
     */
    CoverPhoto?: string;

    /**
     * The name of the file which contains the `scss`-code of the theme.
     */
    CustomScssFileName?: string;

    /**
     * The name of the file which contains `scss`-Variable overrides.
     */
    ScssOverrideFileName?: string;

    /**
     * The name of the file which contains variables of the theme.
     */
    VariableFileName?: string;

    /**
     * The image-directory provided by the theme.
     */
    Images?: ImageDirectoryDescriptor;
}