import INodeOptions from "./INodeOptions";
import Node from "./Node";

/**
 * Provides options for the `INodeContainer` interface.
 */
export default interface INodeContainerOptions<T extends Node> extends INodeOptions
{
    /**
     * Gets the nodes contained by this node.
     */
    Nodes?: T[];
}