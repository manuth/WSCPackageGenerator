import { InputQuestion } from "inquirer";
import { Generator } from "./Generator";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";
import { SourceQuestion } from "./SourceQuestion";

/**
 * Represents a question for a component-file.
 */
export class WoltLabComponentQuestion<T extends IWoltLabGeneratorSettings> extends SourceQuestion<T>
{
    /**
     * Initializes a new instance of the `WoltLabComponentQuestion<T>` class.
     *
     * @param generator
     * The generator.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: InputQuestion<T>)
    {
        super(generator, options);
    }

    /**
     * @inheritdoc
     */
    protected get RootDir()
    {
        return this.Generator.componentPath();
    }
}