import { isNullOrUndefined } from "util";
import { Node } from "../../NodeSystem/Node";
import { NodeItem } from "../../NodeSystem/NodeItem";
import { INodeSystemInstructionOptions } from "./INodeSystemInstructionOptions";
import { Instruction } from "./Instruction";

/**
 * Represents an instruction which provides nodes.
 */
export abstract class NodeSystemInstruction<T extends NodeItem, TOptions> extends Instruction
{
    /**
     * The nodes provides by the instruction.
     */
    private nodes: Node<T, TOptions>[];

    /**
     * Initializes a new instance of the `NodeSystemInstruction<T>` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (options: TOptions) => T)
    {
        super(options);

        for (let node of options.Nodes)
        {
            this.nodes.push(new Node<T, TOptions>(node, generator));
        }
    }

    /**
     * Gets the nodes provides by the instruction.
     */
    public get Nodes(): Node<T, TOptions>[]
    {
        return this.nodes;
    }

    public get ObjectsByID(): { [id: string]: any }
    {
        let result: { [id: string]: any } = {};

        for (let node of this.Nodes)
        {
            Object.assign(result, this.GetObjects(node));
        }

        return result;
    }

    /**
     * Gets the objects of a node.
     */
    protected GetObjects(node: Node<T, TOptions>): { [id: string]: any }
    {
        let result: { [id: string]: any } = {};

        if (!isNullOrUndefined(node.ID))
        {
            result[node.ID] = node;
        }

        for (let subNode of node.Nodes)
        {
            Object.assign(result, this.GetObjects(subNode));
        }

        return result;
    }
}