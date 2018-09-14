import { isNullOrUndefined } from "util";
import { INodeContainer } from "./INodeContainer";
import { INodeContainerOptions } from "./INodeContainerOptions";
import { Node } from "./Node";
import { NodeCollection } from "./NodeCollection";

/**
 * Represents a node which contains child-nodes.
 */
export abstract class NodeContainer<T extends Node> extends Node implements INodeContainer<T>
{
    /**
     * The nodes contained by this node.
     */
    private nodes: T[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `Node` class.
     */
    public constructor(options: INodeContainerOptions<T>)
    {
        super(options);

        if (!isNullOrUndefined(options.Nodes))
        {
            this.nodes.push(...options.Nodes);
        }
    }

    public get Nodes(): T[]
    {
        return this.nodes;
    }
}