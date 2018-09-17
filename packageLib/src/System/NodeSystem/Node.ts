import { isNullOrUndefined } from "util";
import { INodeOptions } from "./INodeOptions";
import { NodeItem } from "./NodeItem";

/**
 * Represents a node.
 */
export class Node<T extends NodeItem, TOptions>
{
    /**
     * The item of the node.
     */
    private item: T;

    /**
     * The parent of the node.
     */
    private parent: Node<T, TOptions>;

    /**
     * The children of the node.
     */
    private nodes: Node<T, TOptions>[] = [];

    /**
     * Initializes a new instance of the `Node` class.
     */
    public constructor(options: INodeOptions<TOptions>, generator: (node: Node<T, TOptions>, options: TOptions) => T)
    {
        this.item = generator(this, options.Item);

        if (!isNullOrUndefined(options.Nodes))
        {
            for (let node of options.Nodes)
            {
                this.Nodes.push(new Node<T, TOptions>(node, generator));
            }
        }
    }

    /**
     * Gets the item of the node.
     */
    public get Item(): T
    {
        return this.item;
    }

    /**
     * Gets sets the parent of the node.
     */
    public get Parent(): Node<T, TOptions>
    {
        return this.parent;
    }

    /**
     * Gets the children of the node.
     */
    public get Nodes(): Node<T, TOptions>[]
    {
        return this.nodes;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.Item.FullName;
    }
}