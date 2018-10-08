import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile `ILocalizationInstruction`s.
 */
export class LocalizationInstructionCompiler extends LocalizationProviderCompiler<ILocalizationInstruction>
{
    /**
     * Initializes a new instance of the `LocalizationInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ILocalizationInstruction)
    {
        super(item);
    }
}