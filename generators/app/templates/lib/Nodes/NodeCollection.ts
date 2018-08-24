import { Node } from "./Node";

/**
 * Represents a set of nodes.
 */
export class NodeCollection<T extends Node> extends Array<T>
{
    /**
     * The node this collection belongs to.
     */
    private node: Node;

    /**
     * Initializes a new instance of the `NodeCollection` class.
     * 
     * @param node
     * The node this collection belongs to.
     */
    public constructor(node: Node)
    {
        super();
        this.node = node;
    }

    public push(...items: T[])
    {
        for (let item of items)
        {
            item.Parent = this.node;
        }

        return super.push(...items);
    }
}