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
        let messages: { [key: string]: Localization } = {};

        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: null,
                Nodes: []
            });

        let rootNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.acp.option"
            });

        for (let node of this.Nodes)
        {
            Object.assign(messages, this.GetTranslations(node));
        }

        for (let key of Object.keys(messages))
        {
            let node: LocalizationNode = new LocalizationNode(
                {
                    Name: key,
                    Item: {
                        Translations: messages[key].Data
                    }
                });

            rootNode.Nodes.push(node);
        }

        result.Nodes.push(rootNode);
        return result.GetMessages();
    }

    /**
     * Gets the translations of a node recursively.
     *
     * @param node
     * The node to get the translations.
     *
     * @returns
     * The translations of the node.
     */
    public GetTranslations(node: Node<ACPCategory, ICategoryOptions<IACPOptionOptions>>): { [key: string]: Localization }
    {
        let result: { [key: string]: Localization } = {};

        if (
            !isNullOrUndefined(node.Item))
        {
            if (node.Item.DisplayName.GetLocales().length > 0)
            {
                result[`category.${node.FullName}`] = node.Item.DisplayName;
            }

            if (node.Item.Description.GetLocales().length > 0)
            {
                result[`category.${node.FullName}.description`] = node.Item.Description;
            }

            for (let option of node.Item.Options)
            {
                if (option.DisplayName.GetLocales().length > 0)
                {
                    result[option.Name] = option.DisplayName;
                }

                if (option.Description.GetLocales().length > 0)
                {
                    result[`${option.Name}.description`] = option.Description;
                }

                for (let optionItem of option.Items)
                {
                    if (optionItem.DisplayName.GetLocales().length > 0)
                    {
                        result[`${option.Name}.${optionItem.Name}`] = optionItem.DisplayName;
                    }
                }
            }
        }

        for (let subNode of node.Nodes)
        {
            Object.assign(result, this.GetTranslations(subNode));
        }

        return result;
    }
}