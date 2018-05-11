import ITranslationNode from "./ITranslationNode";
import Localizable from "./Localizable";
import NodeCollection from "../Nodes/NodeCollection";
import NodeContainer from "../Nodes/NodeContainer";
import { isNullOrUndefined } from "util";

/**
 * Represents a node that contains localized variables.
 */
export default class TranslationNode extends NodeContainer implements ITranslationNode
{
    /**
     * The id of the error-message.
     */
    private id: string;

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
    public constructor(options: ITranslationNode)
    {
        super(options);

        if (!isNullOrUndefined(options.ID))
        {
            this.ID = options.ID;
        }

        if (!isNullOrUndefined(options.Nodes))
        {
            this.translationNodes.push(...options.Nodes);
        }

        if (!isNullOrUndefined(options.Translations))
        {
            Object.assign(this.translations, options.Translations);
        }
    }

    public get ID(): string
    {
        return this.id;
    }

    public set ID(value: string)
    {
        this.id = value;
    }

    public get Nodes(): TranslationNode[]
    {
        return this.translationNodes;
    }

    public get Translations(): Localizable
    {
        return this.translations;
    }

    /**
     * Gets all errors in this node and all its sub-nodes.
     */
    public GetMessages(): { [id: string]: TranslationNode }
    {
        let result: { [id: string]: TranslationNode } = { };

        if (Object.keys(this.Translations).length > 0)
        {
            result[this.ID] = this;
        }

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetMessages());
        }

        return result;
    }

    /**
     * Gets the translations contained by this node and all its subnodes.
     */
    public GetTranslations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];

        if (Object.keys(this.Translations).length > 0)
        {
            result.push(this);
        }

        for (let node of this.Nodes)
        {
            result.push(...node.GetTranslations());
        }

        return result;
    }

    public toString(): string
    {
        return this.FullName;
    }
}