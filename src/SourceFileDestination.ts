import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { ComponentDestination } from "./ComponentDestination";
import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents the destination of a WoltLab Suite Core-component.
 */
export class SourceFileDestination<T extends IGeneratorSettings> extends ComponentDestination<T>
{
    /**
     * Initializes a new instance of the `SourceFileDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponentDestination<T>)
    {
        super(generator, options);
    }

    public Validate(input: string, answers: T)
    {
        if (!new RegExp(`${escapeStringRegexp(`${this.Generator.sourcePath() + Path.sep}`)}.+`).test(input))
        {
            return `The file must be inside the \`${this.Generator.sourcePath()}\`-directory.`;
        }
        else
        {
            return super.Validate(input, answers);
        }
    }

    protected MakeRootPath(...path: string[])
    {
        return super.MakeRootPath(this.Generator.componentPath(), ...path);
    }
}