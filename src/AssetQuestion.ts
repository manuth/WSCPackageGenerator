import { Question } from "inquirer";
import { ComponentQuestion } from "./ComponentQuestion";
import { Generator } from "./Generator";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents a question for assets.
 */
export class AssetQuestion<T extends IGeneratorSettings> extends ComponentQuestion<T>
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
    public constructor(generator: Generator<T>, id: string, options: Question<T>)
    {
        super(generator, id, options);
    }

    protected get RootDir()
    {
        return this.Generator.assetPath();
    }
}