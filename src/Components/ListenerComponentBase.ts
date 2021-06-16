import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { ListenerInstructionFileMapping } from "../FileMappings/ListenerInstructionFileMapping";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { FileInstructionComponent } from "./FileInstructionComponent";

/**
 * Provides a component for generating template- or event-listeners.
 */
export abstract class ListenerComponentBase<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link ListenerComponentBase `ListenerComponentBase<TSettings, TOptions, TComponentOptions>`} class.
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
        return new ListenerInstructionFileMapping(this);
    }
}
