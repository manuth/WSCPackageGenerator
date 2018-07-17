import * as FileSystem from "fs";
import Component from "../../PackageSystem/Component";
import IStyle from "./IStyle";
import * as Path from "path";
import StyleInstruction from "./StyleInstruction";
import ImageFolderDescriptor from "./ImageFolderDescriptor";
import { isNullOrUndefined } from "util";

/**
 * Represents a style for WoltLab Suite Core.
 */
export default class Style extends Component
{
    /**
     * The instruction this style belongs to.
     */
    private instruction: StyleInstruction = null;

    /**
     * The filename of the thumbnail of the style.
     */
    private thumbnail: string = null;

    /**
     * The root of the images provided by this style.
     */
    private images: ImageFolderDescriptor = null;

    /**
     * The variables of the style.
     */
    private variables: object = { };

    /**
     * The scss-code provided by this style.
     */
    private customScss: string = null;

    /**
     * The scss-code provided by this style that is used
     * for overwriting variables originally provided by WoltLab Suite Core.
     */
    private overrideScss: string = null;

    /**
     * Initializes a new instance of the `Style` class.
     */
    public constructor(options: IStyle)
    {
        super(options);

        if (!isNullOrUndefined(options.Thumbnail))
        {
            this.thumbnail = options.Thumbnail;
        }

        if (!isNullOrUndefined(options.ImagesRoot))
        {
            this.images = options.ImagesRoot;
        }
        
        if (!isNullOrUndefined(options.VariableFile))
        {
            this.variables = require(Path.join(process.cwd(), options.VariableFile));
        }

        if (!isNullOrUndefined(options.CustomScssFile))
        {
            this.customScss = FileSystem.readFileSync(options.CustomScssFile).toString();
        }

        if (!isNullOrUndefined(options.OverrideScssFile))
        {
            this.overrideScss = FileSystem.readFileSync(options.OverrideScssFile).toString();
        }
    }

    /**
     * Gets or sets the instruction this style belongs to.
     */
    public get Instruction(): StyleInstruction
    {
        return this.instruction;
    }

    public set Instruction(value: StyleInstruction)
    {
        this.instruction = value;
    }

    /**
     * Gets or sets the filename of the thumbnail of the style.
     */
    public get Thumbnail(): string
    {
        return this.thumbnail;
    }

    public set Thumbnail(value: string)
    {
        this.thumbnail = value;
    }

    /**
     * Gets or sets the root of the images provided by this style.
     */
    public get Images(): ImageFolderDescriptor
    {
        return this.images;
    }

    public set Images(value: ImageFolderDescriptor)
    {
        this.images = value;
    }

    /**
     * Gets or sets the variables of the style.
     */
    public get Variables(): object
    {
        return this.variables;
    }

    public set Variables(value: object)
    {
        this.variables = value;
    }

    /**
     * Gets or sets the scss-code provided by this style.
     */
    public get CustomScss(): string
    {
        return this.customScss;
    }

    public set CustomScss(value: string)
    {
        this.customScss = value;
    }

    /**
     * Gets or sets the scss-code provided by this style that is used
     * for overwriting variables originally provided by WoltLab Suite Core.
     */
    public get OverrideScss(): string
    {
        return this.overrideScss;
    }

    public set OverrideScss(value: string)
    {
        this.overrideScss = value;
    }
}