import { isNullOrUndefined } from "util";

/**
 * Represents a collection which is bidirectional.
 */
export abstract class BidirectionalCollection<TParent, TChild> extends Array<TChild>
{
    /**
     * The owner of the collection.
     */
    private owner: TParent;

    /**
     * Initializes a new instance of the `BidirectionalCollection<TParent, TChild>` class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: TParent)
    {
        super();
        this.owner = owner;
    }

    /**
     * Gets the owner of the collection.
     */
    public get Owner()
    {
        return this.owner;
    }

    public push(...items: TChild[])
    {
        let result = 0;

        for (let item of items)
        {
            if (this.Add(item))
            {
                result++;
            }
        }

        return result;
    }

    public pop()
    {
        let result = this[this.length - 1];
        return this.Remove(result) ? result : undefined;
    }

    public shift()
    {
        let result = this[0];
        return this.Remove(result) ? result : undefined;
    }

    public unshift(...items: TChild[])
    {
        let result = 0;

        for (let i = items.length - 1; i >= 0; i--)
        {
            if (this.Add(items[i]))
            {
                result++;
            }
        }

        return result;
    }

    /**
     * Gets the parent of a child.
     *
     * @param child
     * The child whose parent to return.
     *
     * @returns
     * The parent of the `child`.
     */
    protected abstract GetParent(child: TChild): TParent;

    /**
     * Sets the parent of a child.
     *
     * @param child
     * The child whose parent is to be set.
     *
     * @param parent
     * The parent to set.
     */
    protected abstract SetParent(child: TChild, parent: TParent): void;

    /**
     * Securely adds an item.
     *
     * @param item
     * The item to add.
     */
    protected Add(item: TChild)
    {
        if (this.GetParent(item) !== this.Owner)
        {
            super.push(item);

            if (!isNullOrUndefined(item))
            {
                this.SetParent(item, this.Owner);
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
    protected Remove(item: TChild)
    {
        if (this.GetParent(item) === this.Owner)
        {
            super.splice(this.indexOf(item), 1);

            if (!isNullOrUndefined(item))
            {
                this.SetParent(item, null);
            }

            return true;
        }
        else
        {
            return false;
        }
    }
}