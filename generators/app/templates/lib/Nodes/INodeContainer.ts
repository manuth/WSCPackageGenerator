import INode from "./INode";
import NodeContainer from "./NodeContainer";

/**
 * Represents a node which contains child-nodes.
 */
export default interface INodeContainer extends INode
{
    /**
     * Gets the nodes contained by this node.
     */
    Nodes?: NodeContainer[];
}