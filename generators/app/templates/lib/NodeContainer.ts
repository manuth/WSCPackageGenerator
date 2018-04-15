import NodeCollection from "./Collections/NodeCollection";
import Node from "./Node";
import { isNullOrUndefined } from "util";

/**
 * Represents a node.
 */
export default abstract class NodeContainer extends Node
{
    /**
     * The nodes contained by this node.
     */
    private nodes: NodeContainer[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `Node` class.
     */
    public constructor(options: Partial<NodeContainer> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Nodes))
        {
            this.nodes.push(...options.Nodes);
        }
    }

    /**
     * Gets the nodes contained by this node.
     */
    public get Nodes(): NodeContainer[]
    {
        return this.nodes;
    }
}