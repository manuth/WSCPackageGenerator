import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { NodeInstructionFileMapping } from "../FileMappings/NodeInstructionFileMapping";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { FileInstructionComponent } from "./FileInstructionComponent";

/**
 * Provides a component for generating node-system instructions.
 */
export abstract class NodeSystemComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link NodeSystemComponent `NodeSystemComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    public constructor(generator: WoltLabGenerator<any, TOptions>)
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
