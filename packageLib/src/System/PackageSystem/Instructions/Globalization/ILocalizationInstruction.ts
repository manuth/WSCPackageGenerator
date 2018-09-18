import { Localizable } from "../../../Globalization/Localizable";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction
{
    /**
     * Gets the messages provided by the instruction.
     */
    GetMessages(): { [category: string]: { [key: string]: Localizable } };
}