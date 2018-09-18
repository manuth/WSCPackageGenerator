import { ErrorMessageNode } from "../../../Globalization/ErrorMessageNode";
import { ILocalizationNodeOptions } from "../../../Globalization/ILocalizationNodeOptions";
import { Localizable } from "../../../Globalization/Localizable";
import { INodeSystemInstructionOptions } from "../INodeSystemInstructionOptions";
import { LocalizationInstruction } from "./LocalizationInstruction";

/**
 * Represents an instruction which provides translations.
 */
export class ErrorMessageInstruction extends LocalizationInstruction<ErrorMessageNode, ILocalizationNodeOptions>
{
    /**
     * Initializes a new instance of the `ErrorMessageInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationNodeOptions>)
    {
        super(options, (opts: ILocalizationNodeOptions) => new ErrorMessageNode(opts));
    }

    public GetMessages(): { [category: string]: { [key: string]: Localizable } }
    {
        let result: { [category: string]: { [key: string]: Localizable } } = { "wcf.acp.option.error": {} };
        let messages: { [category: string]: { [key: string]: Localizable } } = super.GetMessages();

        for (let category in messages)
        {
            Object.assign(result["wcf.acp.option.error"], messages[category]);
        }

        return result;
    }
}