import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { IWSCPackageSettings } from "./generators/app/IWSCPackageSettings";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { IComponentDestination } from "./IComponentDestination";
import { IFileMapping } from "./IFileMapping";
import { WSCComponentDestination } from "./WSCComponentDestination";

/**
 * Represents a file-mapping for a WoltLab Suite Core-component.
 */
export class SourceFileMapping<T extends IWSCPackageSettings> implements IFileMapping<T>
{
    /**
     * The generator of the file-mapping.
     */
    private generator: Generator<T>;

    /**
     * The tag of the file-mapping.
     */
    private tag: string;

    /**
     * The source of the file.
     */
    private source: string | ((answers: T) => string | Promise<string>);

    /**
     * The context for copying the file.
     */
    private context: ((answers: T, srouce: string, destination: string) => any | Promise<any>);

    /**
     * The destination of the file.
     */
    private destination: string | IComponentDestination<T> | ((answers: T) => string | Promise<string>);

    /**
     * Initializes a new instance of the `WSCFileMapping<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IFileMapping<T>)
    {
        this.generator = generator;
        this.Tag = options.Tag;
        this.Source = options.Source;

        if (
            typeof options.Destination !== "string" &&
            typeof options.Destination !== "function")
        {
            this.Destination = new WSCComponentDestination(generator, options.Destination);
        }
        else
        {
            this.Destination = options.Destination;
        }

        this.Context = (answers, source, destination) =>
        {
            let result: any | Promise<any>;

            if (!isNullOrUndefined(options.Context))
            {
                result = options.Context(answers, source, destination);
            }
            else
            {
                result = {};
            }

            if (result instanceof Promise)
            {
                return (async () =>
                {
                    return this.ExtendContext(await result, answers, source, destination);
                })();
            }
            else
            {
                return this.ExtendContext(result, answers, source, destination);
            }
        };
    }

    /**
     * Gets the generator of the file-mapping.
     */
    public get Generator()
    {
        return this.generator;
    }

    public get Tag()
    {
        return this.tag;
    }

    public set Tag(value)
    {
        this.tag = value;
    }

    public get Source()
    {
        return this.source;
    }

    public set Source(value)
    {
        this.source = value;
    }

    public get Context()
    {
        return this.context;
    }

    public set Context(value)
    {
        this.context = value;
    }

    public get Destination()
    {
        return this.destination;
    }

    public set Destination(value)
    {
        this.destination = value;
    }

    /**
     * Extends the context by some default values.
     *
     * @param context
     * The context to extend.
     */
    protected ExtendContext(context: any, answers: T, source: string, destination: string)
    {
        Object.assign(
            context,
            {
                relativePackage: (() =>
                {
                    let result = Path.posix.normalize(
                        Path.relative(Path.dirname(destination), Path.join(answers[WSCPackageSetting.Destination], this.Generator.sourcePath())).replace(
                            new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

                    if (!result.startsWith("."))
                    {
                        result = "./" + result;
                    }

                    if (!result.endsWith("/"))
                    {
                        result = result + "/";
                    }

                    return result;
                })()
            });

        return context;
    }
}