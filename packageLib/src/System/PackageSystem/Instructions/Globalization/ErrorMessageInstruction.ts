import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { Localization } from "../../../Globalization/Localization";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
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

    public GetMessages(): { [category: string]: { [key: string]: Localization } }
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: this.FileName,
                Nodes: []
            });

        let rootNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.acp.option.error"
            });

        let messages: { [category: string]: { [key: string]: Localization } } = super.GetMessages();

        for (let category in messages)
        {
            for (let key in messages[category])
            {
                rootNode.Nodes.push(
                    new LocalizationNode(
                        {
                            Name: key,
                            Item:
                            {
                                Translations: messages[category][key].Data
                            }
                        }));
            }
        }

        result.Nodes.push(rootNode);
        return result.GetMessages();
    }
}