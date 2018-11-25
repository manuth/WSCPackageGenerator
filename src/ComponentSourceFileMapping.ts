import { ComponentSourceFileDestination } from "./ComponentSourceFileDestination";
import { Generator } from "./Generator";
import { IWSCPackageSettings } from "./generators/app/IWSCPackageSettings";
import { IInteractiveFileMapping } from "./IInteractiveFileMapping";
import { SourceFileMapping } from "./SourceFileMapping";

/**
 * Represents a file-mapping for a WoltLab Suite Core-component.
 */
export class ComponentSourceFileMapping<T extends IWSCPackageSettings> extends SourceFileMapping<T>
{

    /**
     * Initializes a new instance of the `WSCFileMapping<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: IInteractiveFileMapping<T>)
    {
        super(generator, id, options);
        this.Destination = new ComponentSourceFileDestination(generator, id, options.Destination);
    }
}