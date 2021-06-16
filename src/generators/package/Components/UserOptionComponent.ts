import { GeneratorOptions } from "@manuth/extended-yo-generator";
import type { UserOptionInstruction } from "@manuth/woltlab-compiler";
import { NodeSystemComponent } from "../../../Components/NodeSystemComponent";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating user-options.
 */
export class UserOptionComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends NodeSystemComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link UserOptionComponent `UserOptionComponent<TSettings, TOptions, TComponentOptions>`} class.
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
