import { INode } from "./INode";

/**
 * Represents an item of a node.
 */
export class NodeItem
{
    /**
     * The node of the item.
     */
    private node: INode;

    /**
     * Gets or sets the node of the item.
     */
    public get Node(): INode
    {
        return this.node;
    }

    public set Node(value: INode)
    {
        this.node = value;
    }

    /**
     * Gets the identifiable objects of the node.
     */
    public GetObjects(): { [id: string]: any }
    {
        return {};
    }
}