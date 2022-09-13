import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { ACPOptionInstruction } from "@manuth/woltlab-compiler";
import { NodeSystemComponent } from "../../../Components/NodeSystemComponent.js";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

/**
 * Provides a component for generating admin-options.
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
export class OptionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends NodeSystemComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link OptionComponent `OptionComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public get OutputFileName(): string
    {
        return "options.xml";
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.Option;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Admin Control-Panel Options";
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-class.
     */
    protected GetClassName(options: TComponentOptions): string
    {
        return nameof<ACPOptionInstruction>();
    }
}
