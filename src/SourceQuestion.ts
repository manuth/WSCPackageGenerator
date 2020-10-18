import escapeStringRegexp = require("escape-string-regexp");
import { InputQuestion, Validator } from "inquirer";
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

    /**
     * @inheritdoc
     */
    protected get RootDir(): string
    {
        return this.Generator.sourcePath();
    }

    /**
     * @inheritdoc
     */
    public get validate(): Validator<T>
    {
        return (input, answers) =>
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
