import { BidirectionalCollection } from "../Collections/BidirectionalCollection";
import { Node } from "./Node";
import { NodeItem } from "./NodeItem";

/**
 * Represents a collection of items.
 */
export class NodeCollection<T extends Node<TItem, TOptions>, TItem extends NodeItem, TOptions> extends BidirectionalCollection<Node<TItem, TOptions>, T>
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

    protected GetParent(child: T): Node<TItem, TOptions>
    {
        return child.Parent;
    }

    protected SetParent(child: Node<TItem, TOptions>, parent: T): void
    {
        child.Parent = parent;
    }
}