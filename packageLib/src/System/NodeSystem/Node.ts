import { isNullOrUndefined } from "util";
import { TreeObjectCollection } from "./NodeCollection";

/**
 * Represents a recursive object.
 */
export class Node
{
    /**
     * The name of the item.
     */
    private name: string;

    /**
     * The parent of the object.
     */
    private parent: Node;

    /**
     * The children of the object.
     */
    private nodes: Node[] = new TreeObjectCollection(this);

    /**
     * Gets the parents of the node of the item.
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
     * Gets or sets the parent of the object.
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
     * Gets the children of the object.
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