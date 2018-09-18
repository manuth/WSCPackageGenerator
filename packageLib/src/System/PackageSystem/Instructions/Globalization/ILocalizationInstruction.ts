import { Localizable } from "../../../Globalization/Localizable";
import { IInstruction } from "../IInstruction";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction extends IInstruction
{
    /**
     * Gets the messages provided by the instruction.
     */
    GetMessages(): { [category: string]: { [key: string]: Localizable } };
}