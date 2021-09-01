import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { ErrorMessageInstruction } from "@manuth/woltlab-compiler";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { TranslationComponent } from "./TranslationComponent";

/**
 * Provides a component for generating error-messages.
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
export class ErrorMessageComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends TranslationComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link ErrorMessageComponent `ErrorMessageComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public override get ClassName(): string
    {
        return nameof<ErrorMessageInstruction>();
    }

    /**
     * @inheritdoc
     */
    public override get OutputFileName(): string
    {
        return "errorMessages";
    }

    /**
     * @inheritdoc
     */
    public override get ID(): string
    {
        return PackageComponentType.ErrorMessage;
    }

    /**
     * @inheritdoc
     */
    public override get DisplayName(): string
    {
        return "Error-Messages";
    }
}
