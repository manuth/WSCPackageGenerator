import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IFileMapping } from "./IFileMapping";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents a file-mapping for a typescript-file.
 */
export class TypeScriptFileMapping<T extends IGeneratorSettings> implements IFileMapping<T>
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
    private destination: IComponentDestination<T> | string | ((answers: T) => string | Promise<string>);

    /**
     * Initializes a new instance of the `WSCFileMapping<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IFileMapping<T>)
    {
        this.generator = generator;
        this.Source = options.Source;
        this.Destination = options.Destination;
    }

    /**
     * Gets the generator of the file-mapping.
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

    public Process(source: string, destination: string, context?: any)
    {
        this.Generator.CopyTypeScriptFile(source, destination, context);
    }
}