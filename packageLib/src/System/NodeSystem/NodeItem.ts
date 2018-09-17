import { INodeItemOptions } from "./INodeItemOptions";
import { Node } from "./Node";

/**
 * Represents an item of a node.
 */
export class NodeItem
{
    /**
     * The node of the item.
     */
    private node: Node<NodeItem, INodeItemOptions>;

    /**
     * The name of the item.
     */
    private name: string;

    /**
     * Gets the tree of the parents of the node.
     */
    protected get ParentTree(): Node<NodeItem, INodeItemOptions>[]
    {
        let result: Node<NodeItem, INodeItemOptions>[] = [];

        for (let node: Node<NodeItem, INodeItemOptions> = this.Node.Parent; node !== null; node = node.Parent)
        {
            result.push(node);
        }

        return result;
    }

    /**
     * Gets the node of the item.
     */
    public get Node(): Node<NodeItem, INodeItemOptions>
    {
        return this.node;
    }

    /**
     * Gets or sets the name of the item.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets the full name of the node.
     */
    public get FullName(): string
    {
        return [this.Node as Node<NodeItem, INodeItemOptions>].concat(this.ParentTree).map((node: Node<NodeItem, INodeItemOptions>) => node.Item.Name).join(".");
    }
}