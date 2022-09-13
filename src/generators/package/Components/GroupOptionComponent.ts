import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { GroupOptionInstruction } from "@manuth/woltlab-compiler";
import { NodeSystemComponent } from "../../../Components/NodeSystemComponent.js";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

/**
 * Provides a component for generating group-options.
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
export class GroupOptionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends NodeSystemComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link GroupOptionComponent `GroupOptionComponent<TSettings, TOptions, TComponentOptions>`} class.
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
        return "groupOptions.xml";
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.GroupOption;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Group-Permission Options";
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
        return nameof<GroupOptionInstruction>();
    }
}
