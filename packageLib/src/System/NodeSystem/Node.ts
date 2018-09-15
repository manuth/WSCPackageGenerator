import { INodeOptions } from "./INodeOptions";

/**
 * Represents a node.
 */
export abstract class Node
{
    /**
     * The name of the node.
     */
    private name: string;

    /**
     * The parent of the node.
     */
    private parent: Node;

    /**
     * Initializes a new instance of the `Node` class.
     */
    public constructor(options: INodeOptions, parent?: Node)
    {
        this.name = options.Name;
        this.parent = parent;
    }

    /**
     * Gets the tree of the parents of the node.
     */
    protected get ParentTree(): Node[]
    {
        let result: Node[] = [];

        for (let node: Node = this.Parent; node !== null; node = node.Parent)
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
        return [this as Node].concat(this.ParentTree).map((node: Node) => node.Name).join(".");
    }

    /**
     * Gets sets the parent of the node.
     */
    public get Parent(): Node
    {
        return this.parent;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.FullName;
    }
}