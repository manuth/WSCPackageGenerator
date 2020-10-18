import Path = require("path");
import { IFileMapping } from "extended-yo-generator";
import { AsyncDynamicQuestionProperty } from "inquirer";
import UPath = require("upath");
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
     *
     * @param answers
     * The answers provided by the user.
     *
     * @param source
     * The path to load the template from.
     *
     * @param destination
     * The path to save the new file to.
     */
    private context: (answers: T, source: string, destination: string) => any;

    /**
     * The destination to save the component to.
     */
    private destination: string | Promise<string> | ((answers: T) => string | Promise<string>);

    /**
     * The method to execute for processing the file-mapping.
     *
     * @param source
     * The path to the source-file.
     *
     * @param destination
     * The path to save the processed file to.
     *
     * @param context
     * The context to copy the file.
     *
     * @param defaultProcessor
     * The default processor to use if the file-mapping has no processor.
     *
     * @param settings
     * The settings to use.
     */
    private process: (source: string, destination: string, context?: any, defaultProcessor?: (source: string, destination: string, context?: any) => void, settings?: T) => void | Promise<void>;

    /**
     * Initializes a new instance of the `SourceFileMapping<T>` class.
     *
     * @param generator
     * The generator of this file-mapping.
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
    public get Generator(): Generator<T>
    {
        return this.generator;
    }

    /**
     * @inheritdoc
     */
    public get Source(): AsyncDynamicQuestionProperty<string>
    {
        return this.source;
    }

    /**
     * @inheritdoc
     */
    public set Source(value: AsyncDynamicQuestionProperty<string>)
    {
        this.source = value;
    }

    /**
     * @inheritdoc
     */
    public get Context(): IFileMapping<T>["Context"]
    {
        return (answers, source, destination) =>
        {
            let context: any;

            if (this.context)
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
                        let result = UPath.relative(
                            UPath.dirname(destination),
                            UPath.join(answers[WSCPackageSetting.Destination], this.Generator.sourcePath()));

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
                        let levels = UPath.relative(Path.dirname(destination), answers[WSCPackageSetting.Destination]).split(UPath.sep).length;

                        return (path: string) =>
                        {
                            let pathSegments = UPath.normalize(path).split(UPath.sep);
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

    /**
     * @inheritdoc
     */
    public set Context(value)
    {
        this.context = value;
    }

    /**
     * @inheritdoc
     */
    public get Destination(): AsyncDynamicQuestionProperty<string>
    {
        return this.destination;
    }

    /**
     * @inheritdoc
     */
    public set Destination(value: AsyncDynamicQuestionProperty<string>)
    {
        this.destination = value;
    }

    /**
     * @inheritdoc
     */
    public get Process(): IFileMapping<T>["Process"]
    {
        return this.process;
    }

    /**
     * @inheritdoc
     */
    public set Process(value: IFileMapping<T>["Process"])
    {
        this.process = value;
    }
}
