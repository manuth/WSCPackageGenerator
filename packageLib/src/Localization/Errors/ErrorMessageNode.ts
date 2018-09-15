import { isNullOrUndefined } from "util";
import { NodeCollection } from "../../Nodes/NodeCollection";
import { TranslationNode } from "../TranslationNode";
import { IErrorMessageNode } from "./IErrorMessageNode";
import { IErrorMessageNodeOptions } from "./IErrorMessageNodeOptions";

/**
 * Represents a node that contains localizes error-messages.
 */
export class ErrorMessageNode extends TranslationNode implements IErrorMessageNode
{
    /**
     * The nodes contained by this node.
     */
    private errorMessageNodes: ErrorMessageNode[] = new NodeCollection<ErrorMessageNode>(this);

    public constructor(options: IErrorMessageNodeOptions)
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
    public get ErrorName(): string
    {
        return this.FullName.replace(/^wcf\.acp\.option\.error\./, "");
    }

    public get Nodes(): ErrorMessageNode[]
    {
        return this.errorMessageNodes;
    }

    /**
     * Gets all errors in this node and all its sub-nodes.
     */
    public GetErrors(): { [id: string]: ErrorMessageNode }
    {
        return this.GetMessages() as { [id: string]: ErrorMessageNode };
    }
}