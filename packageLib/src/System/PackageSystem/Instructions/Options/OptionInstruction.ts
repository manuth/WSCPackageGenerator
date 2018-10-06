import { isNullOrUndefined } from "util";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { Node } from "../../../NodeSystem/Node";
import { Category } from "../../../Options/Category";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { IOptionOptions } from "../../../Options/IOptionOptions";
import { Option } from "../../../Options/Option";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../Globalization/TranslationInstruction";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";

/**
 * Represents an instruction which provides options.
 */
export abstract class OptionInstruction<TCategory extends Category<TOption, TOptionOptions>, TCategoryOptions extends ICategoryOptions<TOptionOptions>, TOption extends Option, TOptionOptions extends IOptionOptions> extends NodeSystemInstruction<TCategory, TCategoryOptions> implements ILocalizationInstruction
{
    /**
     * Initializes a new instance of the `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>` class.
     */
    public constructor(options: INodeSystemInstructionOptions<TCategoryOptions>, generator: (node: Node<TCategory, TCategoryOptions>, options: TCategoryOptions) => TCategory)
    {
        super(options, generator);
    }

    public get TranslationDirectory(): string
    {
        return this.Type;
    }

    /**
     * Gets the category of the translations.
     */
    public abstract get RootCategory(): string;

    /**
     * Gets the category of the translations of the options.
     */
    public get OptionCategory(): string
    {
        return null;
    }

    /**
     * Gets the category of the translations of the categories.
     */
    public get CategoryCategory(): string
    {
        return "category";
    }

    public GetMessages(): { [locale: string]: { [category: string]: { [key: string]: string } } }
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: null,
                Nodes: []
            });

        let translationRoot: LocalizationNode = new LocalizationNode(
            {
                Name: this.RootCategory
            });

        let optionNode: LocalizationNode;

        if (!isNullOrUndefined(this.OptionCategory))
        {
            optionNode = new LocalizationNode(
                {
                    Name: this.OptionCategory
                });

            translationRoot.Nodes.push(optionNode);
        }
        else
        {
            optionNode = translationRoot;
        }

        let categoryNode: LocalizationNode;

        if (!isNullOrUndefined(this.CategoryCategory))
        {
            categoryNode = new LocalizationNode(
                {
                    Name: this.CategoryCategory
                });

            optionNode.Nodes.push(categoryNode);
        }
        else
        {
            categoryNode = optionNode;
        }

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

        result.Nodes.push(translationRoot);
        return result.GetMessages();
    }
}