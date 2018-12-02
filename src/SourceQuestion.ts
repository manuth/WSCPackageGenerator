import escapeStringRegexp = require("escape-string-regexp");
import { Question } from "extended-yo-generator";
import Path = require("path");
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
     * @param id
     * The id of the component.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: Question<T>)
    {
        super(generator, id, options);
    }

    protected get RootDir()
    {
        return this.Generator.sourcePath();
    }

    public get validate()
    {
        return (input: string, answers: T): boolean | string | Promise<boolean | string> =>
        {
            if (!new RegExp(`${escapeStringRegexp(`${this.Generator.sourcePath() + Path.sep}`)}.+`).test(input))
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