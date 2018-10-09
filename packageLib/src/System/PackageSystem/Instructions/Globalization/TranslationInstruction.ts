import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { LocalizationItem } from "../../../Globalization/LocalizationItem";
import { Node } from "../../../NodeSystem/Node";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { LocalizationInstruction } from "./LocalizationInstruction";

/**
 * Represents an instruction which provides translations.
 */
export class TranslationInstruction extends LocalizationInstruction<LocalizationItem, ILocalizationItemOptions>
{
    /**
     * Initializes a new instance of the `TranslationInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationItemOptions>)
    {
        super(
            options,
            (node: Node<LocalizationItem, ILocalizationItemOptions>, opts: ILocalizationItemOptions): LocalizationItem =>
            {
                return new LocalizationItem(node, opts);
            });
    }
}