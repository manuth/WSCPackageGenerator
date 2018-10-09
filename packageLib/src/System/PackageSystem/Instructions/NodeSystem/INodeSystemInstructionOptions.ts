import { INodeOptions } from "../../../NodeSystem/INodeOptions";
import { IInstructionOptions } from "../IInstructionOptions";

/**
 * Represents an instruction which provides nodes.
 */
export interface INodeSystemInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The nodes provided by the instruction.
     */
    Nodes: INodeOptions<T>[];
}