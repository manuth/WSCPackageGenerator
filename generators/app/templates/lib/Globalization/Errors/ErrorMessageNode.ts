import IErrorMessageNode from "./IErrorMessageNode";
import NodeCollection from "../../Nodes/NodeCollection";
import TranslationNode from "../TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents a node that contains localizes error-messages.
 */
export default class ErrorMessageNode extends TranslationNode implements IErrorMessageNode
{
    /**
     * The nodes contained by this node.
     */
    private errorMessageNodes: ErrorMessageNode[] = new NodeCollection(this);

    public constructor(options: IErrorMessageNode)
    {
        super(options);

        if (!isNullOrUndefined(options.Nodes))
        {
            this.errorMessageNodes.push(...options.Nodes);
        }
    }

    /**
     * Gets the name of the error.
     */
    public get FullErrorName(): string
    {
        if (this.Parent)
        {
            return this.FullName;
        }
        else
        {
            return "wcf.acp.option.error." + this.FullName;
        }
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
        return this.GetMessages() as { [id: string]: ErrorMessageNode };
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.FullErrorName;
    }
}