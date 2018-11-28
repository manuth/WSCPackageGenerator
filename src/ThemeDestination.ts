import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";
import { SourceFileDestination } from "./SourceFileDestination";

/**
 * Represents the destination of a WoltLab Suite Core-theme.
 */
export class ThemeDestination<T extends IGeneratorSettings> extends SourceFileDestination<T>
{
    /**
     * Initializes a new instance of the `ThemeDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: IComponentDestination<T>)
    {
        super(generator, id, options);
    }
}