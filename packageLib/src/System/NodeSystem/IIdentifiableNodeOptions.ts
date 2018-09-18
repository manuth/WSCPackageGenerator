import { INodeOptions } from "./INodeOptions";

/**
 * Provides options for the `IdentifiableNode` class.
 */
export interface IIdentifiableNodeOptions extends INodeOptions
{
    /**
     * The id of the node.
     */
    ID?: string;

    Nodes?: IIdentifiableNodeOptions[];
}