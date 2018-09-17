import { isNullOrUndefined } from "util";
import { TreeObjectCollection } from "./TreeObjectCollection";

/**
 * Represents a recursive object.
 */
export class TreeObject<T>
{
    /**
     * The parent of the object.
     */
    private parent: TreeObject<T>;

    /**
     * The children of the object.
     */
    private nodes: TreeObject<T>[] = new TreeObjectCollection(this);

    /**
     * The item of the object.
     */
    private item: T;

    /**
     * Gets or sets the parent of the object.
     */
    public get Parent(): TreeObject<T>
    {
        return this.parent;
    }

    public set Parent(value: TreeObject<T>)
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
    public get Nodes(): TreeObject<T>[]
    {
        return this.nodes;
    }

    /**
     * Gets or sets the item of the object.
     */
    public get Item(): T
    {
        return this.item;
    }

    public set Item(value: T)
    {
        this.item = value;
    }
}