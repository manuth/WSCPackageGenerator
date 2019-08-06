import chalk from "chalk";
import { InputQuestion, Transformer } from "inquirer";
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a question for files.
 */
export class ComponentQuestion<T extends IWoltLabGeneratorSettings> implements InputQuestion<T>
{
    /**
     * @inheritdoc
     */
    public type: InputQuestion<T>["type"] = "input";

    /**
     * @inheritdoc
     */
    public name: InputQuestion<T>["name"];

    /**
     * @inheritdoc
     */
    public message: InputQuestion<T>["message"];

    /**
     * @inheritdoc
     */
    public default: InputQuestion<T>["default"];

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
    public constructor(generator: Generator<T>, options: InputQuestion<T>)
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

    /**
     * @inheritdoc
     */
    public get transformer(): Transformer<T>
    {
        return (input, answers?, options?) =>
        {
            return (!isNullOrUndefined(options) && options.isFinal) ? chalk.cyan(input) : this.MakeRootPath(input);
        };
    }

    /**
     * @inheritdoc
     */
    public get filter()
    {
        return (input: any) =>
        {
            return this.transformer(input, null, null);
        };
    }

    /**
     * @inheritdoc
     */
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