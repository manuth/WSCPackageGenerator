import { isNullOrUndefined } from "util";
import { Localization } from "../../../Globalization/Localization";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { Node } from "../../../NodeSystem/Node";
import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { IACPOptionOptions } from "../../../Options/ControlPanel/IACPOptionOptions";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../Globalization/TranslationInstruction";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export class ACPOptionInstruction extends NodeSystemInstruction<ACPCategory, ICategoryOptions<IACPOptionOptions>> implements ILocalizationInstruction
{
    /**
     * Initializes a new instance of the `ACPOptionInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ICategoryOptions<IACPOptionOptions>>)
    {
        super(
            options,
            (node: Node<ACPCategory, ICategoryOptions<IACPOptionOptions>>, opts: ICategoryOptions<IACPOptionOptions>): ACPCategory =>
            {
                return new ACPCategory(node, opts);
            });
    }

    public get TranslationDirectory(): string
    {
        return this.Type;
    }

    public get Type(): string
    {
        return "option";
    }

    public GetMessages(): { [category: string]: { [key: string]: Localization } }
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: null,
                Nodes: []
            });

        let optionNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.acp.option"
            });

        let categoryNode: LocalizationNode = new LocalizationNode(
            {
                Name: "category"
            });

        for (let rootNode of this.Nodes)
        {
            for (let node of rootNode.GetAllNodes())
            {
                if (!isNullOrUndefined(node.Item))
                {
                    let categoryTranslations: LocalizationNode = new LocalizationNode(
                        {
                            Name: node.FullName,
                            Item: node.Item.DisplayName.GetLocales().length > 0 ?
                                {
                                    Translations: node.Item.DisplayName.Data
                                } : undefined
                        });

                    if (node.Item.Description.GetLocales().length > 0)
                    {
                        categoryTranslations.Nodes.push(
                            new LocalizationNode(
                                {
                                    Name: "description",
                                    Item: {
                                        Translations: node.Item.Description.Data
                                    }
                                }));
                    }

                    for (let option of node.Item.Options)
                    {
                        let optionTranslations: LocalizationNode = new LocalizationNode(
                            {
                                Name: option.Name,
                                Item: option.DisplayName.GetLocales().length > 0 ?
                                    {
                                        Translations: option.DisplayName.Data
                                    } : undefined
                            });

                        for (let optionItem of option.Items)
                        {
                            if (optionItem.DisplayName.GetLocales().length > 0)
                            {
                                optionTranslations.Nodes.push(
                                    new LocalizationNode(
                                        {
                                            Name: optionItem.Name,
                                            Item: {
                                                Translations: optionItem.DisplayName.Data
                                            }
                                        }));
                            }
                        }

                        optionNode.Nodes.push(optionTranslations);
                    }

                    categoryNode.Nodes.push(categoryTranslations);
                }
            }
        }

        optionNode.Nodes.push(categoryNode);
        result.Nodes.push(optionNode);
        return result.GetMessages();
    }
}