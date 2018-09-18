import { ILocalizationInstruction } from "./ILocalizationInstruction";

/**
 * Represents an instruction which provides instructions.
 */
export interface ITranslationProviderInstruction
{
    /**
     * Gets the translations of the instruction.
     */
    Translations: ILocalizationInstruction;
}