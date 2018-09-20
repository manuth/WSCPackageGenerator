import { isNullOrUndefined } from "util";
import { Node } from "./Node";
import { NodeItem } from "./NodeItem";

/**
 * Represents a collection of items.
 */
export class NodeCollection<T extends Node<TItem, TOptions>, TItem extends NodeItem, TOptions> extends Array<T>
{
    /**
     * The owner of the collection.
     */
    private owner: T;

    /**
     * Initializes a new instance of the `NodeCollection<T>` class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: T)
    {
        super();
        this.owner = owner;
    }

    /**
     * Gets the owner of the collection.
     */
    public get Owner(): T
    {
        return this.owner;
    }

    /**
     * Securely adds an item.
     *
     * @param item
     * The item to add.
     */
    protected Add(item: T): boolean
    {
        if (item.Parent !== this.Owner)
        {
            super.push(item);

            if (!isNullOrUndefined(item))
            {
                item.Parent = this.Owner;
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Securely removes an item.
     *
     * @param item
     * The item to remove.
     */
    protected Remove(item: T): boolean
    {
        if (item.Parent === this.Owner)
        {
            super.splice(this.indexOf(item), 1);

            if (!isNullOrUndefined(item))
            {
                item.Parent = null;
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    public push(...items: T[]): number
    {
        let result: number = 0;

        for (let item of items)
        {
            if (this.Add(item))
            {
                result++;
            }
        }

        return result;
    }

    public pop(): T
    {
        let result: T = this[this.length - 1];
        return this.Remove(result) ? result : undefined;
    }

    public shift(): T
    {
        let result: T = this[0];
        return this.Remove(result) ? result : undefined;
    }

    public unshift(...items: T[]): number
    {
        let result: number = 0;

        for (let i: number = items.length - 1; i >= 0; i--)
        {
            if (this.Add(items[i]))
            {
                result++;
            }
        }

        return result;
    }
}