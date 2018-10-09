import { BidirectionalCollection } from "../Collections/BidirectionalCollection";
import { INode } from "./Generic/INode";
import { NodeItem } from "./NodeItem";

/**
 * Represents a collection of items.
 */
export class NodeCollection<T extends INode<TItem>, TItem extends NodeItem> extends BidirectionalCollection<INode<TItem>, T>
{
    /**
     * Initializes a new instance of the `NodeCollection<T>` class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: T)
    {
        super(owner);
    }

    protected GetParent(child: T): INode<TItem>
    {
        return child.Parent;
    }

    protected SetParent(child: INode<TItem>, parent: T): void
    {
        child.Parent = parent;
    }
}