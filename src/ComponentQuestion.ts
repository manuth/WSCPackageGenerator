import chalk from "chalk";
import { Question } from "extended-yo-generator";
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a question for files.
 */
export class ComponentQuestion<T extends IWoltLabGeneratorSettings> implements Question<T>
{
    public type = "input";

    public name: string;

    public message: string | ((answers: T) => string);

    public default: any | ((answers: T) => any) | ((answers: T) => Promise<any>);

    /**
     * The generator.
     */
    private generator: Generator<T>;

    /**
     * Initializes a new instance of the `ComponentQuestion<T>` class.
     *
     * @param generator
     * The generator.
     *
     * @param options
     * The options for the question.
     */
    public constructor(generator: Generator<T>, options: Question<T>)
    {
        this.generator = generator;
        Object.assign(this, options);

        if (typeof this.default === "string")
        {
            this.default = Path.normalize(this.default);
        }
        else if (typeof this.default === "function")
        {
            let defaultFunction = this.default;

            this.default = (answers: T) =>
            {
                let result = defaultFunction(answers);

                if (typeof result === "string")
                {
                    return Path.normalize(result);
                }
                else
                {
                    return (async () =>
                    {
                        return Path.normalize(await result);
                    })();
                }
            };
        }
    }

    public get transformer()
    {
        return (input: string, answers?: T, options?: { isFinal: boolean }) =>
        {
            return (!isNullOrUndefined(options) && options.isFinal) ? chalk.cyan(input) : this.MakeRootPath(input);
        };
    }

    public get filter()
    {
        return (input: string) =>
        {
            return this.transformer(input);
        };
    }

    public get validate()
    {
        return (input: string, answers: T): boolean | string | Promise<boolean | string> =>
        {
            return true;
        };
    }

    /**
     * Gets the generator.
     */
    public get Generator()
    {
        return this.generator;
    }

    /**
     * Gets or sets the root the file is relative to.
     */
    protected get RootDir()
    {
        return "";
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the root of the component.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeRootPath(...path: string[])
    {
        return [this.RootDir, ...path].join(Path.sep);
    }
}