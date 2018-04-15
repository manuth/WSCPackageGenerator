import * as FileSystem from 'fs';
import Component from "../Component";
import StyleConfig from "./StyleConfig";
import Instruction from '../Instruction';
import { isUndefined } from 'util';

/**
 * Represents a style for WoltLab Suite Core.
 */
export default class Style extends Component
{
    /**
     * The instruction this style belongs to.
     */
    private instruction: Instruction;

    /**
     * The filename of the thumbnail of the style.
     */
    private thumbnail: string = null;

    /**
     * The root of the images provided by this style.
     */
    private imagesRoot: string = null;
    
    /**
     * The variables provided by this style.
     */
    private variables: { [name: string]: string } = { };

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
    public constructor(options: Partial<StyleConfig> = { })
    {
        super(options);
    
        if (!isUndefined(options.Thumbnail))
        {
            this.thumbnail = options.Thumbnail;
        }

        if (!isUndefined(options.ImagesRoot))
        {
            this.imagesRoot = options.ImagesRoot;
        }

        if (!isUndefined(options.VariableFile))
        {
            this.variables = require(options.VariableFile) as { [name: string]: string };
        }

        if (!isUndefined(options.CustomScssFile))
        {
            this.customScss = FileSystem.readFileSync(options.CustomScssFile).toString();
        }

        if (!isUndefined(options.OverrideScssFile))
        {
            this.overrideScss = FileSystem.readFileSync(options.OverrideScssFile).toString();
        }
    }

    /**
     * Gets or sets the instruction this style belongs to.
     */
    public get Instruction(): Instruction
    {
        return this.instruction;
    }

    public set Instruction(value: Instruction)
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
    public get ImagesRoot(): string
    {
        return this.imagesRoot;
    }

    public set ImagesRoot(value: string)
    {
        this.imagesRoot = value;
    }

    /**
     * Gets the variables provided by this style.
     */
    public get Variables(): { [name: string]: string }
    {
        return this.variables;
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