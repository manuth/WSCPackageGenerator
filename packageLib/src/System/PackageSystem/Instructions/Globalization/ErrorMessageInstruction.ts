import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { Localizable } from "../../../Globalization/Localizable";
import { INodeSystemInstructionOptions } from "../INodeSystemInstructionOptions";
import { TranslationInstruction } from "./TranslationInstruction";

/**
 * Represents an instruction which provides translations.
 */
export class ErrorMessageInstruction extends TranslationInstruction
{
    /**
     * Initializes a new instance of the `ErrorMessageInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationItemOptions>)
    {
        super(options);
    }

    public GetMessages(): { [category: string]: { [key: string]: Localizable } }
    {
        let rootName: string = "wcf.acp.option.error";
        let result: { [category: string]: { [key: string]: Localizable } } = {};
        let messages: { [category: string]: { [key: string]: Localizable } } = super.GetMessages();

        result[rootName] = {};

        for (let category in messages)
        {
            for (let key in messages[category])
            {
                result[rootName][`${rootName}.${key}`] = messages[category][key];
            }
        }

        return result;
    }
}