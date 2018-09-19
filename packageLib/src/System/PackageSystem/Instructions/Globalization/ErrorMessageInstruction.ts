import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { Localizable } from "../../../Globalization/Localizable";
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

    public GetMessages(): { [category: string]: { [key: string]: Localizable } }
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

        let messages: { [category: string]: { [key: string]: Localizable } } = super.GetMessages();

        for (let category in messages)
        {
            let categoryNode: LocalizationNode = new LocalizationNode(
                {
                    Name: category
                });

            for (let key in messages[category])
            {
                categoryNode.Nodes.push(
                    new LocalizationNode(
                        {
                            Name: key,
                            Item:
                            {
                                Translations: messages[category][key]
                            }
                        }));
            }

            rootNode.Nodes.push(categoryNode);
        }

        result.Nodes.push(rootNode);
        return result.GetMessages();
    }
}