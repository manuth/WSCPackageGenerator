import { Question } from "extended-yo-generator";
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
        return this.Generator.componentPath();
    }
}