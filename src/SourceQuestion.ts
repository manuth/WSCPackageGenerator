import escapeStringRegexp = require("escape-string-regexp");
import { InputQuestion } from "inquirer";
import UPath = require("upath");
import { ComponentQuestion } from "./ComponentQuestion";
import { Generator } from "./Generator";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a question for source-files.
 */
export class SourceQuestion<T extends IWoltLabGeneratorSettings> extends ComponentQuestion<T>
{
    /**
     * Initializes a new instance of the `SourceQuestion<T>` class.
     *
     * @param generator
     * The generator.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: InputQuestion<T>)
    {
        super(generator, options);
    }

    protected get RootDir()
    {
        return this.Generator.sourcePath();
    }

    public get validate()
    {
        return (input: string, answers: T): boolean | string | Promise<boolean | string> =>
        {
            if (!new RegExp(`${escapeStringRegexp(`${UPath.normalize(this.Generator.sourcePath()) + UPath.sep}`)}.+`).test(UPath.normalize(input)))
            {
                return `The file must be inside the "${this.Generator.sourcePath()}"-directory.`;
            }
            else
            {
                return super.validate(input, answers);
            }
        };
    }
}