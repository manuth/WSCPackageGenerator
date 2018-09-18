import { Node } from "../../NodeSystem/Node";
import { INodeSystemInstructionOptions } from "./INodeSystemInstructionOptions";
import { Instruction } from "./Instruction";

/**
 * Represents an instruction which provides nodes.
 */
export abstract class NodeSystemInstruction<T extends Node, TOptions> extends Instruction
{
    /**
     * The nodes provides by the instruction.
     */
    private nodes: T[];

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
            this.nodes.push(generator(node));
        }
    }

    /**
     * Gets the nodes provides by the instruction.
     */
    public get Nodes(): T[]
    {
        return this.nodes;
    }
}