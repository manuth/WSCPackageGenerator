import { IdentifiableNode } from "../NodeSystem/IdentifiableNode";
import { ILocalizationNodeOptions } from "./ILocalizationNodeOptions";
import { Localizable } from "./Localizable";

/**
 * Represents a node which contains translations.
 */
export class LocalizationNode extends IdentifiableNode
{
    /**
     * The translations of the node.
     */
    private translations: Localizable = new Localizable();

    /**
     * Initializes a new instance of the `Node` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: ILocalizationNodeOptions, generator: (options: ILocalizationNodeOptions) => LocalizationNode)
    {
        super(options, generator);
    }

    /**
     * Gets or sets the parent of the node.
     */
    public get Parent(): LocalizationNode
    {
        return super.Parent as LocalizationNode;
    }

    public set Parent(value: LocalizationNode)
    {
        super.Parent = value;
    }

    /**
     * Gets the children of the node.
     */
    public get Nodes(): LocalizationNode[]
    {
        return super.Nodes as LocalizationNode[];
    }

    /**
     * Gets the translations of the node.
     */
    public get Translations(): Localizable
    {
        return this.translations;
    }

    /**
     * Gets all translations in this node recursively.
     */
    public GetTranslations(): { [key: string]: Localizable }
    {
        let result: { [key: string]: Localizable } = {};

        if (Object.keys(this.Translations).length > 0)
        {
            result[this.FullName] = this.Translations;
        }

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetTranslations());
        }

        return result;
    }
}