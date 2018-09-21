import { isNullOrUndefined } from "util";
import { INode } from "./INode";
import { INodeOptions } from "./INodeOptions";
import { NodeCollection } from "./NodeCollection";
import { NodeItem } from "./NodeItem";

/**
 * Represents a node.
 */
export class Node<T extends NodeItem, TOptions> implements INode
{
    /**
     * The id of the node.
     */
    private id: string = null;

    /**
     * The name of the node.
     */
    private name: string;

    /**
     * The item of the node.
     */
    private item: T = null;

    /**
     * The parent of the node.
     */
    private parent: Node<T, TOptions> = null;

    /**
     * The children of the node.
     */
    private nodes: Node<T, TOptions>[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `Node` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeOptions<TOptions>, generator: (options: TOptions) => T)
    {
        if (!isNullOrUndefined(options.ID))
        {
            this.ID = options.ID;
        }

        this.Name = options.Name;

        if (!isNullOrUndefined(options.Item))
        {
            this.item = generator(options.Item);
        }

        if (!isNullOrUndefined(options.Nodes))
        {
            for (let node of options.Nodes)
            {
                this.Nodes.push(new Node(node, generator));
            }
        }
    }

    /**
     * Gets the parents of the node.
     */
    protected get Parents(): Node<T, TOptions>[]
    {
        let result: Node<T, TOptions>[] = [];

        for (let node: Node<T, TOptions> = this.Parent; node !== null; node = node.Parent)
        {
            result.push(node);
        }

        return result;
    }

    /**
     * Gets or sets the id of the node.
     */
    public get ID(): string
    {
        return this.id;
    }

    public set ID(value: string)
    {
        this.id = value;
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
        return this.Parents.reverse().concat([this]).map((node: Node<T, TOptions>) => node.Name).join(".");
    }

    /**
     * Gets or sets the item of the node.
     */
    public get Item(): T
    {
        return this.item;
    }

    public set Item(value: T)
    {
        if (!isNullOrUndefined(value))
        {
            value.Node = this;
        }

        this.item = value;
    }

    /**
     * Gets or sets the parent of the node.
     */
    public get Parent(): Node<T, TOptions>
    {
        return this.parent;
    }

    public set Parent(value: Node<T, TOptions>)
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
    public get Nodes(): Node<T, TOptions>[]
    {
        return this.nodes;
    }

    /**
     * Gets the identifiable objects of the node.
     */
    public GetObjects(): { [id: string]: any }
    {
        let result: { [id: string]: any } = {};

        if (!isNullOrUndefined(this.ID))
        {
            result[this.ID] = this;
        }

        if (!isNullOrUndefined(this.Item))
        {
            Object.assign(result, this.Item.GetObjects());
        }

        return result;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.FullName;
    }
}