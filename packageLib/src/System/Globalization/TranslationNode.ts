import { ILocalizationNodeOptions } from "./ILocalizationNodeOptions";
import { LocalizationNode } from "./LocalizationNode";

/**
 * Represents a node which provides translations.
 */
export class TranslationNode extends LocalizationNode
{
    /**
     * Initializes a new instance of the `TranslationNode` class.
     */
    public constructor(options: ILocalizationNodeOptions)
    {
        super(options, (opts: ILocalizationNodeOptions) => new TranslationNode(opts));
    }

    /**
     * Gets or sets the parent of the node.
     */
    public get Parent(): TranslationNode
    {
        return super.Parent as TranslationNode;
    }

    public set Parent(value: TranslationNode)
    {
        super.Parent = value;
    }

    /**
     * Gets the children of the node.
     */
    public get Nodes(): TranslationNode[]
    {
        return super.Nodes as TranslationNode[];
    }
}