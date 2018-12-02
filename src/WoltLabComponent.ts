import { Generator } from "./Generator";
import { IGeneratorSettings } from "./IGeneratorSettings";
import { IWoltLabComponent } from "./IWoltLabComponent";
import { SourceComponent } from "./SourceComponent";
import { WoltLabComponentQuestion } from "./WoltLabComponentQuestion";

/**
 * Represents a component which provides component source-files.
 */
export class WoltLabComponent<T extends IGeneratorSettings> extends SourceComponent<T>
{
    /**
     * Initializes a new instance of the `WoltLabComponent<T>` class.
     *
     * @param generator
     * The generation the component belongs to.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IWoltLabComponent<T>)
    {
        super(generator, options);
        this.Question = new WoltLabComponentQuestion(generator, options.ID, options.Question);
    }
}