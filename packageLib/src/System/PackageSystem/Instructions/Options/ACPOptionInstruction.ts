import { Node } from "../../../NodeSystem/Node";
import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { IACPOptionOptions } from "../../../Options/ControlPanel/IACPOptionOptions";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export class ACPOptionInstruction extends NodeSystemInstruction<ACPCategory, ICategoryOptions<IACPOptionOptions>>
{
    /**
     * Initializes a new instance of the `ACPOptionInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<ICategoryOptions<IACPOptionOptions>>)
    {
        super(
            options,
            (node: Node<ACPCategory, ICategoryOptions<IACPOptionOptions>>, opts: ICategoryOptions<IACPOptionOptions>): ACPCategory =>
            {
                return new ACPCategory(node, opts);
            });
    }

    public get Type(): string
    {
        return "option";
    }
}