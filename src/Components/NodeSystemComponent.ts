import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { NodeInstructionFileMapping } from "../FileMappings/NodeInstructionFileMapping";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { FileInstructionComponent } from "./FileInstructionComponent";

/**
 * Provides a component for generating node-system instructions.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export abstract class NodeSystemComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link NodeSystemComponent `NodeSystemComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new NodeInstructionFileMapping(this);
    }
}
