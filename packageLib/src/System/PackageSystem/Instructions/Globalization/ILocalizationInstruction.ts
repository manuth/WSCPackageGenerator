import { Localization } from "../../../Globalization/Localization";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction
{
    /**
     * Gets the path to save the translations to.
     */
    TranslationDirectory: string;

    /**
     * Gets the messages provided by the instruction.
     */
    GetMessages(): { [category: string]: { [key: string]: Localization } };
}