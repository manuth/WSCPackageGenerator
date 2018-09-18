import { ILocalizationInstruction } from "./ILocalizationInstruction";

/**
 * Represents an instruction which provides instructions.
 */
export interface ITranslationProviderInstruction
{
    /**
     * Gets the path to save the translations to.
     */
    TranslationDirectory: string;

    /**
     * Gets the translations of the instruction.
     */
    Translations: ILocalizationInstruction;
}