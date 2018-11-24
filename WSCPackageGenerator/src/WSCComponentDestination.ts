import { Answers } from "inquirer";
import Path = require("path");
import { ComponentDestination } from "./ComponentDestination";
import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents the destination of a WoltLab Suite Core-component.
 */
export class WSCComponentDestination<T extends IGeneratorSettings> extends ComponentDestination<T>
{
    /**
     * Initializes a new instance of the `WSCComponentDestination<T>` class.
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
        return super.MakeRootPath(this.Generator.componentPath(), ...path);
    }
}