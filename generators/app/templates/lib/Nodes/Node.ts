import INode from "./INode";
import NodeContainer from "./NodeContainer";
import { isNullOrUndefined } from "util";

/**
 * Represents a node.
 */
export default class Node implements INode
{
    /**
     * The name of the node.
     */
    private name: string = "";

    /**
     * The parent of thie node.
     */
    private parent: Node = null;

    /**
     * Initializes a new instance of the `NodeChild` class.
     */
    public constructor(options: INode)
    {
        if (!isNullOrUndefined(options.Name))
        {
            this.name = options.Name;
        }
    }

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
        if (this.Parent)
        {
            return [ this.Parent.FullName, this.Name ].join(".");
        }
        else
        {
            return this.Name;
        }
    }

    /**
     * Gets or sets the parent of this node.
     */
    public get Parent(): Node
    {
        return this.parent;
    }

    public set Parent(value: Node)
    {
        this.parent = value;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.Name;
    }
}