import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ACPOptionInstruction } from "@manuth/woltlab-compiler";
import { NodeSystemComponent } from "../../../Components/NodeSystemComponent";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating admin-options.
 */
export class OptionComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends NodeSystemComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link OptionComponent `OptionComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public get ClassName(): string
    {
        return nameof<ACPOptionInstruction>();
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
}
