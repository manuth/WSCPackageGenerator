import { ComponentDestination } from "./ComponentDestination";
import { Generator } from "./Generator";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents the destination of an asset.
 */
export class AssetDestination<T extends IGeneratorSettings> extends ComponentDestination<T>
{
    /**
     * Initializes a new instance of the `AssetDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponentDestination<T>)
    {
        super(generator, options);
    }

    protected MakeRootPath(...path: string[])
    {
        return super.MakeRootPath(this.Generator.assetPath(), ...path);
    }
}