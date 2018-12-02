import escapeStringRegexp = require("escape-string-regexp");
import { IFileMapping } from "extended-yo-generator";
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a file-mapping for a source-file.
 */
export class SourceFileMapping<T extends IWoltLabGeneratorSettings> implements IFileMapping<T>
{
    /**
     * The generator this file-mapping belongs to.
     */
    private generator: Generator<T>;

    /**
     * The path to the template of the component.
     */
    private source: string | Promise<string> | ((answers: T) => string | Promise<string>);

    /**
     * The context to use for copying the file-entry.
     */
    private context: (answers: T, source: string, destination: string) => any;

    /**
     * The destination to save the component to.
     */
    private destination: string | Promise<string> | ((answers: T) => string | Promise<string>);

    /**
     * The method to execute for processing the file-mapping.
     */
    private process: (source: string, destination: string, context?: any, defaultProcessor?: (source: string, destination: string, context?: any) => void, settings?: T) => void | Promise<void>;

    /**
     * Initializes a new instance of the `SourceFileMapping<T>` class.
     *
     * @param options
     * Options for the initialization.
     */
    public constructor(generator: Generator<T>, options: Partial<IFileMapping<T>>)
    {
        this.generator = generator;
        this.Source = options.Source;
        this.Context = options.Context;
        this.Destination = options.Destination;
        this.Process = options.Process;
    }

    /**
     * Gest the generator this file-mapping belongs to.
     */
    public get Generator()
    {
        return this.generator;
    }

    public get Source()
    {
        return this.source;
    }

    public set Source(value)
    {
        this.source = value;
    }

    public get Context(): (answers: T, source: string, destination: string) => any
    {
        return (answers, source, destination) =>
        {
            let context: any;

            if (!isNullOrUndefined(this.context))
            {
                context = this.context(answers, source, destination);
            }
            else
            {
                context = {};
            }

            Object.assign(
                context,
                {
                    RelativeSourceRoot: (() =>
                    {
                        let result = Path.posix.normalize(
                            Path.relative(
                                Path.dirname(destination),
                                Path.join(answers[WSCPackageSetting.Destination], this.Generator.sourcePath())).replace(
                                    new RegExp(escapeStringRegexp(Path.sep), "g"),
                                    "/"));

                        if (!result.startsWith("."))
                        {
                            result = `./${result}`;
                        }

                        if (!result.endsWith("/"))
                        {
                            result = `${result}/`;
                        }

                        return result;
                    })(),
                    MakePackagePath: (() =>
                    {
                        let levels = Path.relative(Path.dirname(destination), answers[WSCPackageSetting.Destination]).split(Path.sep).length;

                        return (path: string) =>
                        {
                            let pathSegments = path.split(new RegExp(`[${escapeStringRegexp(`${Path.win32.sep}${Path.posix.sep}`)}]`, "g"));

                            let result = "Path.join(__dirname";

                            for (let i = 0; i < levels; i++)
                            {
                                result = `${result}, ".."`;
                            }

                            for (let segment of pathSegments)
                            {
                                result = `${result}, "${segment}"`;
                            }

                            result = `${result})`;
                            return result;
                        };
                    })()
                });

            return context;
        };
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

    public get Process()
    {
        return this.process;
    }

    public set Process(value)
    {
        this.process = value;
    }
}