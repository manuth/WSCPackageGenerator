/**
 * Provides options for the `Node` class.
 */
export interface INodeOptions<T>
{
    /**
     * The id of the node.
     */
    ID?: string;

    /**
     * The name of the node.
     */
    Name: string;

    /**
     * The item of the node
     */
    Item?: T;

    /**
     * The parent of the node.
     */
    Parent?: INodeOptions<T>;

    /**
     * The children of the node.
     */
    Nodes?: INodeOptions<T>[];
}