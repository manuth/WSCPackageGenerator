import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { InstructionComponent } from "./InstructionComponent.js";

/**
 * Provides a component for generating instruction-files with a `FileName`-property.
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
export abstract class FileInstructionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Gets the name of the output-file that is generated by the instruction.
     */
    public abstract get OutputFileName(): string;
}
