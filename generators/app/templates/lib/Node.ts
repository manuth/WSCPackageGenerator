import NodeContainer from "./NodeContainer";

/**
 * Represents a child of a node.
 */
export default class Node
{
    /**
     * The name of the node.
     */
    private name: string = '';

    /**
     * The parent of thie node.
     */
    private parent?: Node = null;

    /**
     * Initializes a new instance of the `NodeChild` class.
     */
    public constructor(options: Partial<Node> = { })
    {
        if (options.Name)
        {
            this.name = options.Name;
        }

        if (options.Parent)
        {
            this.parent = options.Parent;
        }
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
        if (this.Parent)
        {
            return [ this.Parent.FullName, this.Name ].join('.');
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
}