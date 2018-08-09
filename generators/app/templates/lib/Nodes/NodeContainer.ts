import INodeContainerOptions from "./INodeContainerOptions";
import Node from "./Node";
import NodeCollection from "./NodeCollection";
import { isNullOrUndefined } from "util";
import INodeContainer from "./INodeContainer";

/**
 * Represents a node which contains child-nodes.
 */
export default abstract class NodeContainer extends Node implements INodeContainer
{
    /**
     * The nodes contained by this node.
     */
    private nodes: NodeContainer[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `Node` class.
     */
    public constructor(options: INodeContainerOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.Nodes))
        {
            this.nodes.push(...options.Nodes);
        }
    }

    public get Nodes(): NodeContainer[]
    {
        return this.nodes;
    }
}