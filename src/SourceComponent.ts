import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Component } from "./Component";
import { Generator } from "./Generator";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { IFileMapping } from "./IFileMapping";
import { IGeneratorSettings } from "./IGeneratorSettings";
import { IWoltLabComponent } from "./IWoltLabComponent";
import { SourceQuestion } from "./SourceQuestion";

/**
 * Represents a component which provides source-files.
 */
export class SourceComponent<T extends IGeneratorSettings> extends Component<T>
{
    /**
     * The generator this component belongs to.
     */
    private generator: Generator<T>;

    /**
     * Initializes a new instance of the `SourceComponent<T>` class.
     *
     * @param generator
     * The generation the component belongs to.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IWoltLabComponent<T>)
    {
        super(options);
        this.generator = generator;
        this.Question = new SourceQuestion(generator, options.ID, options.Question);
    }

    /**
     * Gets the generator this component belongs to.
     */
    public get Generator()
    {
        return this.generator;
    }

    public get FileMapping(): Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>> | ((settings: T) => Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>>)
    {
        let fileMapping = super.FileMapping;

        return async (settings: T) =>
        {
            let primaryFileMapping: Partial<IFileMapping<T>>;

            if (typeof fileMapping === "function")
            {
                fileMapping = fileMapping(settings);
            }

            if (fileMapping instanceof Promise)
            {
                primaryFileMapping = await fileMapping;
            }
            else
            {
                primaryFileMapping = fileMapping;
            }

            let defaultContext = primaryFileMapping.Context;

            primaryFileMapping.Context = (answers, source, destination) =>
            {
                let context: any;

                if (!isNullOrUndefined(defaultContext))
                {
                    context = defaultContext(answers, source, destination);
                }
                else
                {
                    context = {};
                }

                Object.assign(
                    context,
                    {
                        relativePackage: (() =>
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
                        })()
                    });

                return context;
            };

            return primaryFileMapping;
        };
    }

    public set FileMapping(value)
    {
        super.FileMapping = value;
    }
}