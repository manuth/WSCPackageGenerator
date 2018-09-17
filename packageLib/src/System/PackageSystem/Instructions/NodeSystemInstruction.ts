import { Node } from "../../System/NodeSystem/Node";
import { INodeSystemInstructionOptions } from "./INodeSystemInstructionOptions";
import { Instruction } from "./Instruction";

/**
 * Represents an instruction which provides nodes.
 */
export abstract class NodeSystemInstruction<TItem, TOptions> extends Instruction
{
    /**
     * The nodes of the instruction.
     */
    private nodes: Node<TItem, TOptions>[];

    /**
     * Initializes a new instance of the `NodeSystemInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>)
    {
        super(options);
    }

    /**
     * Gets the nodes of the instruction.
     */
    public get Nodes(): Node<TItem, TOptions>[]
    {
        return this.nodes;
    }
}