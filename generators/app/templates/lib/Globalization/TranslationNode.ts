import NodeContainer from "../NodeContainer";
import NodeCollection from "../Collections/NodeCollection";
import Translation from "./Translation";

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
    private translations: Translation[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `TranslationNode` class.
     */
    public constructor(options: Partial<TranslationNode> = { })
    {
        super({ Name: options.Name, Parent: options.Parent });

        if (options.Nodes)
        {
            this.translationNodes.push(...options.Nodes);
        }

        if (options.Translations)
        {
            this.translations.push(...options.Translations);
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
    public get Translations(): Translation[]
    {
        return this.translations;
    }
}