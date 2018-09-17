/**
 * Provides options for the `Node` class.
 */
export interface INodeOptions<T>
{
    /**
     * The item of the node.
     */
    Item: T;

    /**
     * The children of the node.
     */
    Nodes?: INodeOptions<T>[];
}