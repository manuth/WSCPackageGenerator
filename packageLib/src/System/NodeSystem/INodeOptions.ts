/**
 * Provides options for the `Node` class.
 */
export interface INodeOptions
{
    /**
     * The name of the node.
     */
    Name: string;

    /**
     * The children of the node.
     */
    Nodes?: INodeOptions[];
}