import { Localizable } from "../../../Globalization/Localizable";
import { Instruction } from "../Instruction";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction extends Required<Instruction>
{
    /**
     * Gets the messages provided by the instruction.
     */
    GetMessages(): { [category: string]: { [key: string]: Localizable } };
}