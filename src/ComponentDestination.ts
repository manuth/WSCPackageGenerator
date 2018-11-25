import escapeStringRegexp = require("escape-string-regexp");
import { Answers, Question } from "inquirer";
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents the destination of a component.
 */
export abstract class ComponentDestination<T extends IGeneratorSettings> implements IComponentDestination<T>
{
    /**
     * The generator of the file-mapping.
     */
    private generator: Generator<T>;

    /**
     * The message to ask for the destination.
     */
    private message: string;

    /**
     * The default value of the destination.
     */
    private default: string | ((answers: T) => string | Promise<string>);

    /**
     * The inquirer-settings for the destination.
     */
    private settings: Partial<Question<T>> = {};

    /**
     * Initializes a new instance of the `ComponentDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponentDestination<T>)
    {
        this.generator = generator;
        this.Message = options.Message;

        if (typeof options.Default === "string")
        {
            this.Default = Path.normalize(options.Default);
        }
        else if (typeof options.Default === "function")
        {
            let defaultFunction = options.Default;

            this.Default = (answers) =>
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

        Object.assign(this.Settings, options.Settings);

        this.Settings.transformer = (input: string, answers?: T, options?: { isFinal: boolean }) => this.Transform(input, answers, options);
        this.Settings.filter = (input) => this.Filter(input);
        this.Settings.validate = (input, answers) => this.Validate(input, answers);
    }

    /**
     * Gets the generator of the file-mapping.
     */
    public get Generator()
    {
        return this.generator;
    }

    public get Message()
    {
        return this.message;
    }

    public set Message(value)
    {
        this.message = value;
    }

    public get Default()
    {
        return this.default;
    }

    public set Default(value)
    {
        this.default = value;
    }

    public get Settings()
    {
        return this.settings;
    }

    public set Settings(value)
    {
        this.settings = value;
    }

    /**
     * Transforms the user-input.
     *
     * @param input
     * The input to transform.
     *
     * @param answers
     * The answers to the previous questions.
     */
    protected Transform(input: string, answers?: T, options?: { isFinal: boolean })
    {
        return (!isNullOrUndefined(options) && options.isFinal) ? input : this.MakeRootPath(input);
    }

    /**
     * Transforms the final answer.
     *
     * @param input
     * The input to filter.
     */
    protected Filter(input: string)
    {
        return this.Transform(input);
    }

    /**
     * Validates the user-input.
     *
     * @param input
     * The user-input.
     *
     * @param answers
     * The answers to the previous questions.
     */
    protected Validate(input: string, answers: T): string | boolean | Promise<string | boolean>
    {
        if ((input.lastIndexOf(Path.sep) === input.length - Path.sep.length))
        {
            return "Please provide a file- rather than a directory-name.";
        }
        else
        {
            return true;
        }
    }

    /**
     * Joins the arguments together and returns the resulting path relative to the root of the component.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeRootPath(...path: string[])
    {
        return path.join(Path.sep);
    }
}