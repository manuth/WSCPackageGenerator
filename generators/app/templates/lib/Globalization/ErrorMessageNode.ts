import IErrorMessageNode from "./IErrorMessageNode";
import NodeCollection from "../Nodes/NodeCollection";
import TranslationNode from "./TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents a node that contains localizes error-messages.
 */
export default class ErrorMessageNode extends TranslationNode implements IErrorMessageNode
{
    /**
     * The id of the error-message.
     */
    private id: string;

    /**
     * The nodes contained by this node.
     */
    private errorMessageNodes: ErrorMessageNode[] = new NodeCollection(this);

    public constructor(options: IErrorMessageNode)
    {
        super(options);

        if (!isNullOrUndefined(options.ID))
        {
            this.ID = options.ID;
        }

        if (!isNullOrUndefined(options.Nodes))
        {
            this.errorMessageNodes.push(...options.Nodes);
        }
    }

    /**
     * Gets the name of the error.
     */
    public get GetFullErrorName(): string
    {
        if (this.Parent)
        {
            return super.FullName;
        }
        else
        {
            return "wcf.acp.option.error." + super.FullName;
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

    public get Nodes(): ErrorMessageNode[]
    {
        return this.errorMessageNodes;
    }

    /**
     * Gets the error-messages contained by this node and all its subnodes.
     */
    public GetTranslations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];
        let translationNode = new TranslationNode({ Name: "wcf.acp.option.error" });

        if (Object.keys(this.Translations).length > 0)
        {
            translationNode.Nodes.push(new TranslationNode({
                Name: this.FullName,
                Translations: this.Translations
            }));
        }

        result.push(...translationNode.GetTranslations());

        for (let node of this.Nodes)
        {
            result.push(...node.GetTranslations());
        }

        return result;
    }

    /**
     * Gets all errors in this node and all its sub-nodes.
     */
    public GetErrors(): { [id: string]: ErrorMessageNode }
    {
        let result: { [id: string]: ErrorMessageNode } = { };

        if (Object.keys(this.Translations).length > 0)
        {
            result[this.ID] = this;
        }

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetErrors());
        }

        return result;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.FullName;
    }
}