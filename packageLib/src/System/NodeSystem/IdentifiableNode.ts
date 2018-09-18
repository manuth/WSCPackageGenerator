import { isNullOrUndefined } from "util";
import { IIdentifiableNodeOptions } from "./IIdentifiableNodeOptions";
import { Node } from "./Node";

export class IdentifiableNode extends Node
{
    /**
     * The id of the node.
     */
    private id: string = null;

    /**
     * Initializes a new instance of the `IdentifiableNode` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: IIdentifiableNodeOptions, generator: (options: IIdentifiableNodeOptions) => IdentifiableNode)
    {
        super(options, generator);

        if (!isNullOrUndefined(options.ID))
        {
            this.ID = options.ID;
        }
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
     * Gets or sets the parent of the node.
     */
    public get Parent(): IdentifiableNode
    {
        return super.Parent as IdentifiableNode;
    }

    public set Parent(value: IdentifiableNode)
    {
        super.Parent = value;
    }

    /**
     * Gets the children of the node.
     */
    public get Nodes(): IdentifiableNode[]
    {
        return super.Nodes as IdentifiableNode[];
    }
}