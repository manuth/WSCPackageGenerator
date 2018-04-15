import NodeContainer from "../NodeContainer";
import NodeCollection from "../Collections/NodeCollection";
import Localizable from "./Localizable";
import { isUndefined } from "util";

/**
 * Represents a node that contains localized variables.
 */
export default class TranslationNode extends NodeContainer
{   
    /**
     * The nodes contained by this node.
     */
    private translationNodes: TranslationNode[] = new NodeCollection(this);

    /**
     * The translations contained by this node.
     */
    private translations: Localizable = new Localizable();

    /**
     * Initializes a new instance of the `TranslationNode` class.
     */
    public constructor(options: Partial<TranslationNode> = { })
    {
        super({ Name: options.Name, Parent: options.Parent });

        if (!isUndefined(options.Nodes))
        {
            this.translationNodes.push(...options.Nodes);
        }

        if (!isUndefined(options.Translations))
        {
            Object.assign(this.translations, options.Translations);
        }
    }

    /**
     * Gets the nodes contained by this node.
     */
    public get Nodes(): TranslationNode[]
    {
        return this.translationNodes;
    }

    /**
     * Gets the translations contained by this node.
     */
    public get Translations(): Localizable
    {
        return this.translations;
    }

    /**
     * Gets the translations contained by this node and all its subnodes.
     */
    public GetTranslations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];

        for (let node of this.Nodes)
        {
            if (Object.keys(node.Translations).length > 0)
            {
                result.push(node);
            }
        }

        if (Object.keys(this.Translations).length > 0)
        {
            result.push(this);
        }

        return result;
    }
}