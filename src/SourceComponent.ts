import { IFileMapping } from "extended-yo-generator";
import { Component } from "./Component";
import { Generator } from "./Generator";
import { IComponent } from "./IComponent";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";
import { SourceFileMapping } from "./SourceFileMapping";
import { SourceQuestion } from "./SourceQuestion";

/**
 * Represents a component which provides source-files.
 */
export class SourceComponent<T extends IWoltLabGeneratorSettings> extends Component<T>
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
    public constructor(generator: Generator<T>, options: IComponent<T>)
    {
        super(options);
        this.generator = generator;
        this.Question = new SourceQuestion(generator, options.Question);
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

            return new SourceFileMapping(this.Generator, primaryFileMapping);
        };
    }

    public set FileMapping(value)
    {
        super.FileMapping = value;
    }
}