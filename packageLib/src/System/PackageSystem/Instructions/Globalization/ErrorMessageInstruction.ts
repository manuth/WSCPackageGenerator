import { isNullOrUndefined } from "util";
import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
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

    public GetMessages(): { [locale: string]: { [category: string]: { [key: string]: string } } }
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: null,
                Nodes: []
            });

        let errorNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.acp.option.error"
            });

        for (let rootNode of this.Nodes)
        {
            for (let node of rootNode.GetAllNodes())
            {
                if (!isNullOrUndefined(node.Item))
                {
                    if (node.Item.Translations.GetLocales().length > 0)
                    {
                        errorNode.Nodes.push(
                            new LocalizationNode(
                                {
                                    Name: node.FullName,
                                    Item:
                                    {
                                        Translations: node.Item.Translations.Data
                                    }
                                }));
                    }
                }
            }
        }

        result.Nodes.push(errorNode);
        return result.GetMessages();
    }
}