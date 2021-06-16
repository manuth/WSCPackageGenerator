import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ErrorMessageInstruction } from "@manuth/woltlab-compiler";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { TranslationComponent } from "./TranslationComponent";

/**
 * Provides a component for generating error-messages.
 */
export class ErrorMessageComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends TranslationComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link ErrorMessageComponent `ErrorMessageComponent<TSettings, TOptions, TComponentOptions>`} class.
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