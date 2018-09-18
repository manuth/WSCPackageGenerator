import { isNullOrUndefined } from "util";
import { Localizable } from "../../../Globalization/Localizable";
import { LocalizationItem } from "../../../Globalization/LocalizationItem";
import { Node } from "../../../NodeSystem/Node";
import { INodeSystemInstructionOptions } from "../INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystemInstruction";
import { ILocalizationInstruction } from "./ILocalizationInstruction";

export abstract class LocalizationInstruction<T extends LocalizationItem, TOptions> extends NodeSystemInstruction<T, TOptions> implements ILocalizationInstruction
{
    /**
     * Initializes a new instance of the `TranslationInstruction<T>` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (options: TOptions) => T)
    {
        super(options, generator);
    }

    public get Type(): string
    {
        return "language";
    }

    public get TranslationDirectory(): string
    {
        return this.FileName;
    }

    public GetMessages(): { [category: string]: { [key: string]: Localizable } }
    {
        let result: { [category: string]: { [key: string]: Localizable } } = {};

        for (let node of this.Nodes)
        {
            result[node.FullName] = this.GetTranslations(node);
        }

        return result;
    }

    public GetTranslations(node: Node<T, TOptions>): { [key: string]: Localizable }
    {
        let result: { [key: string]: Localizable } = {};

        if (
            !isNullOrUndefined(node.Item) &&
            Object.keys(node.Item.Translations).length > 0)
        {
            result[node.FullName] = node.Item.Translations;
        }

        for (let subNode of node.Nodes)
        {
            Object.assign(result, this.GetTranslations(subNode));
        }

        return result;
    }
}