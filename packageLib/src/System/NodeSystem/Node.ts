import { isNullOrUndefined } from "util";
import { INodeOptions } from "./INodeOptions";

/**
 * Represents a node.
 */
export class Node<T, TOptions>
{
    /**
     * The name of the node.
     */
    private name: string;

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
        this.Name = options.Name;
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
     * Gets the tree of the parents of the node.
     */
    protected get ParentTree(): Node<T, TOptions>[]
    {
        let result: Node<T, TOptions>[] = [];

        for (let node: Node<T, TOptions> = this.Parent; node !== null; node = node.Parent)
        {
            result.push(node);
        }

        return result;
    }

    /**
     * Gets or sets the name of the node.
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
        return [this as Node<T, TOptions>].concat(this.ParentTree).map((node: Node<T, TOptions>) => node.Name).join(".");
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
        return this.FullName;
    }
}