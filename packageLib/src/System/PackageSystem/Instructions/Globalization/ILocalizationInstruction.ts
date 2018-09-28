import { IInstruction } from "../IInstruction";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction extends IInstruction
{
    /**
     * Gets the path to save the translations to.
     */
    TranslationDirectory: string;

    /**
     * Gets the messages provided by the instruction.
     */
    GetMessages(): { [locale: string]: { [category: string]: { [key: string]: string } } };
}