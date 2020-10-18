import Path = require("path");
import { Generator as GeneratorBase } from "extended-yo-generator";
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
    public constructor(args: string | string[], options: Record<string, unknown>)
    {
        super(args, options);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the assets-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the assets.
     */
    public assetPath(...path: string[]): string
    {
        return ["assets", ...path].join(Path.sep);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the source-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the source-directory.
     */
    public sourcePath(...path: string[]): string
    {
        return ["src", ...path].join(Path.sep);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the meta-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the metadata-directory.
     */
    public metaPath(...path: string[]): string
    {
        return this.sourcePath("Meta", ...path);
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the component-directory.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The path relative to the component-directory.
     */
    public componentPath(...path: string[]): string
    {
        return this.metaPath("Components", ...path);
    }
}
