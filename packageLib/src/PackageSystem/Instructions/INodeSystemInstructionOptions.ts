import { INodeOptions } from "../../System/NodeSystem/INodeOptions";
import { IInstructionOptions } from "./IInstructionOptions";

/**
 * Provides options for the `INodeSystemInstruction` class.
 */
export interface INodeSystemInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The nodes of the instruction.
     */
    Nodes: INodeOptions<T>[];
}