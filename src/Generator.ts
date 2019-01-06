import { Generator as GeneratorBase } from "extended-yo-generator";
import Path = require("path");
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a yeoman-generator.
 */
export abstract class Generator<T extends IWoltLabGeneratorSettings = IWoltLabGeneratorSettings> extends GeneratorBase<T>
{
    /**
     * Initializes a new instance of the `Generator` class.
     *
     * @param args
     * A set of arguments for the generator.
     *
     * @param options
     * A set of options for the generator.
     */
    public constructor(args: string | string[], options: {})
    {
        super(args, options);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the assets-directory.
     *
     * @param path
     * The path that is to be joined.
     */
    public assetPath(...path: string[])
    {
        return ["assets", ...path].join(Path.sep);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the source-directory.
     *
     * @param path
     * The path that is to be joined.
     */
    public sourcePath(...path: string[])
    {
        return ["src", ...path].join(Path.sep);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the meta-directory.
     *
     * @param path
     * The path that is to be joined.
     */
    public metaPath(...path: string[])
    {
        return this.sourcePath("Meta", ...path);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the component-directory.
     *
     * @param path
     * The path that is to be joined.
     */
    public componentPath(...path: string[])
    {
        return this.metaPath("Components", ...path);
    }
}