import INode from "./INode";
import INodeContainerOptions from "./INodeContainerOptions";
import Node from "./Node";

/**
 * Represents a node which contains child-nodes.
 */
export default interface INodeContainer<T extends Node> extends INode, Required<INodeContainerOptions<T>>
{
}