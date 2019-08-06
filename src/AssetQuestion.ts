import { InputQuestion } from "inquirer";
import { ComponentQuestion } from "./ComponentQuestion";
import { Generator } from "./Generator";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a question for assets.
 */
export class AssetQuestion<T extends IWoltLabGeneratorSettings> extends ComponentQuestion<T>
{
    /**
     * Initializes a new instance of the `AssetQuestion<T>` class.
     *
     * @param generator
     * The generator.
     *
     * @param id
     * The id of the component.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: InputQuestion<T>)
    {
        super(generator, options);
    }

    protected get RootDir()
    {
        return this.Generator.assetPath();
    }
}