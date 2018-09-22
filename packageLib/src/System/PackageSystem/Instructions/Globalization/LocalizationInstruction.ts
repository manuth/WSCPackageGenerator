import { isNullOrUndefined } from "util";
import { Localization } from "../../../Globalization/Localization";
import { LocalizationItem } from "../../../Globalization/LocalizationItem";
import { Node } from "../../../NodeSystem/Node";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";
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
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (node: Node<T, TOptions>, options: TOptions) => T)
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

    public GetMessages(): { [category: string]: { [key: string]: Localization } }
    {
        let result: { [category: string]: { [key: string]: Localization } } = {};

        for (let rootNode of this.Nodes)
        {
            result[rootNode.FullName] = {};

            for (let node of rootNode.GetAllNodes())
            {
                if (
                    !isNullOrUndefined(node.Item) &&
                    node.Item.Translations.GetLocales().length > 0)
                {
                    result[rootNode.FullName][node.FullName] = node.Item.Translations;
                }
            }
        }

        return result;
    }
}