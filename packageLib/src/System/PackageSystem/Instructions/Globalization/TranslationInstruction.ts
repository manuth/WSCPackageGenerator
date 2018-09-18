import { ILocalizationNodeOptions } from "../../../Globalization/ILocalizationNodeOptions";
import { TranslationNode } from "../../../Globalization/TranslationNode";
import { INodeSystemInstructionOptions } from "../INodeSystemInstructionOptions";
import { LocalizationInstruction } from "./LocalizationInstructionl";

/**
 * Represents an instruction which provides translations.
 */
export class TranslationInstruction extends LocalizationInstruction<TranslationNode, ILocalizationNodeOptions>
{
    /**
     * Initializes a new instance of the `TranslationInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationNodeOptions>)
    {
        super(options, (opts: ILocalizationNodeOptions) => new TranslationNode(opts));
    }
}