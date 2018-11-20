import { INode } from "./INode";

/**
 * Represents an item of a node.
 */
export interface INodeItem
{
    /**
     * The node of the item.
     */
    Node: INode;

    /**
     * Gets the identifiable objects of the node.
     */
    GetObjects(): { [id: string]: any };
}