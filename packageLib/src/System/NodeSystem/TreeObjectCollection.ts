import { TreeObject } from "./TreeObject";

/**
 * Represents a collection of items.
 */
export class TreeObjectCollection<T> extends Array<TreeObject<T>>
{
    /**
     * The owner of the collection.
     */
    private owner: TreeObject<T>;

    /**
     * Initializes a new instance of the `TreeObjectCollection<T>` class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: TreeObject<T>)
    {
        super();
        this.owner = owner;
    }

    /**
     * Gets the owner of the collection.
     */
    public get Owner(): TreeObject<T>
    {
        return this.owner;
    }

    /**
     * Securely adds an item.
     *
     * @param item
     * The item to add.
     */
    protected Add(item: TreeObject<T>): boolean
    {
        if (!this.includes(item))
        {
            item.Parent = this.Owner;
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
    protected Remove(item: TreeObject<T>): boolean
    {
        if (this.includes(item))
        {
            item.Parent = null;
            return true;
        }
        else
        {
            return false;
        }
    }

    public push(...items: TreeObject<T>[]): number
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

    public pop(): TreeObject<T>
    {
        let result: TreeObject<T> = this[this.length - 1];
        this.Remove(result);
        return result;
    }

    public shift(): TreeObject<T>
    {
        let result: TreeObject<T> = this[0];
        this.Remove(result);
        return result;
    }

    public unshift(...items: TreeObject<T>[]): number
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