import Node from "./Node";
import NodeContainer from "./NodeContainer";

/**
 * Represents a set of nodes.
 */
export default class NodeCollection<T extends Node> extends Array<T>
{
    /**
     * The node this collection belongs to.
     */
    private node: NodeContainer;

    /**
     * Initializes a new instance of the `NodeCollection` class.
     * 
     * @param node
     * The node this collection belongs to.
     */
    public constructor(node: NodeContainer)
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