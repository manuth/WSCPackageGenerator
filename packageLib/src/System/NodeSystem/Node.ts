import { isNullOrUndefined } from "util";
import { INodeOptions } from "./INodeOptions";
import { NodeCollection } from "./NodeCollection";

/**
 * Represents a node.
 */
export class Node
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
     * The children of the node.
     */
    private nodes: Node[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `Node` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeOptions, generator: (options: INodeOptions) => Node)
    {
        this.Name = options.Name;

        if (!isNullOrUndefined(options.Nodes))
        {
            for (let node of options.Nodes)
            {
                this.Nodes.push(generator(node));
            }
        }
    }

    /**
     * Gets the parents of the node.
     */
    protected get Parents(): Node[]
    {
        let result: Node[];

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
        return this.Parents.reverse().concat([this]).join(".");
    }

    /**
     * Gets or sets the parent of the node.
     */
    public get Parent(): Node
    {
        return this.parent;
    }

    public set Parent(value: Node)
    {
        if (this.Parent !== value)
        {
            if (
                !isNullOrUndefined(this.Parent) &&
                this.Parent.Nodes.includes(this))
            {
                this.Parent.Nodes.splice(this.Parent.Nodes.indexOf(this), 1);
            }

            if (
                isNullOrUndefined(value) ||
                value.Nodes.includes(this))
            {
                this.parent = value;
            }
            else
            {
                value.Nodes.push(this);
            }
        }
    }

    /**
     * Gets the children of the node.
     */
    public get Nodes(): Node[]
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