import Component from "../Component";

/**
 * Represents a style-configuration.
 */
export default class StyleConfig extends Component
{
    /**
     * The filename of the thumbnail of the style.
     */
    private thumbnail: string;

    /**
     * The root of the images provided by the style.
     */
    private imagesRoot: string;

    /**
     * The filename of the file that contains the custom scss-code.
     */
    private customScssFile: string;

    /**
     * The filename of the file that contains scss-code for overriding variables.
     */
    private overrideScssFile: string;

    /**
     * Gets or sets the filename of the thumbnail of the style.
     */
    public get Thumbnail(): string
    {
        return this.Thumbnail;
    }

    public set Thumbnail(value: string)
    {
        this.Thumbnail = value;
    }

    /**
     * Gets or sets the root of the images provided by the style.
     */
    public get ImagesRoot(): string
    {
        return this.imagesRoot;
    }

    public set ImagesRoot(value: string)
    {
        this.imagesRoot = value;
    }
    
    /**
     * Gets or sets the filename of the file that contains the custom scss-code.
     */
    public get CustomScssFile(): string
    {
        return this.customScssFile;
    }

    public set CustomScssFile(value: string)
    {
        this.customScssFile = value;
    }

    /**
     * Gets or sets the filename of the file that contains scss-code for overriding variables.
     */
    public get OverrideScssFile(): string
    {
        return this.overrideScssFile;
    }

    public set OverrideScssFile(value: string)
    {
        this.overrideScssFile = value;
    }
}