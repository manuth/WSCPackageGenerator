import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { UserOptionInstruction } from "@manuth/woltlab-compiler";
import { NodeSystemComponent } from "../../../Components/NodeSystemComponent.js";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

/**
 * Provides a component for generating user-options.
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
export class UserOptionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends NodeSystemComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link UserOptionComponent `UserOptionComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public get ClassName(): string
    {
        return nameof<UserOptionInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get OutputFileName(): string
    {
        return "userOptions.xml";
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.UserOption;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "User-Options";
    }
}
