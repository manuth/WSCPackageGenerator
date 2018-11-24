import Path = require("path");
import { Generator } from "../../Generator";
import { IComponentDestination } from "../../IComponentDestination";
import { IGeneratorSettings } from "../../IGeneratorSettings";
import { ComponentDestination } from "./ComponentDestination";

/**
 * Represents the destination of a WoltLab Suite Core-theme.
 */
export class ThemeDestination<T extends IGeneratorSettings> extends ComponentDestination<T>
{
    /**
     * Initializes a new instance of the `ThemeDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponentDestination<T>)
    {
        super(generator, options);
    }

    protected MakeRootPath(...path: string[])
    {
        return super.MakeRootPath(this.Generator.sourcePath(), ...path);
    }
}