/**
 * Represents a node.
 */
export interface INode
{
    /**
     * Gets or sets the id of the node.
     */
    ID: string;

    /**
     * Gets or sets the name of the node.
     */
    Name: string;

    /**
     * Gets the full name of the node.
     */
    FullName: string;

    /**
     * Gets the identifiable objects of the node.
     */
    GetObjects(): { [id: string]: any };
}