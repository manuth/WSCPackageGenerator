import { Node } from "../../../NodeSystem/Node";
import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { ACPOption } from "../../../Options/ControlPanel/ACPOption";
import { IACPOptionOptions } from "../../../Options/ControlPanel/IACPOptionOptions";
import { IEnabableCategoryOptions } from "../../../Options/IEnabableCategoryOptions";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { OptionInstruction } from "./OptionInstruction";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export class ACPOptionInstruction extends OptionInstruction<ACPCategory, IEnabableCategoryOptions<IACPOptionOptions>, ACPOption, IACPOptionOptions>
{
    /**
     * Initializes a new instance of the `ACPOptionInstruction` class.
     */
    public constructor(options: INodeSystemInstructionOptions<IEnabableCategoryOptions<IACPOptionOptions>>)
    {
        super(
            options,
            (node: Node<ACPCategory, IEnabableCategoryOptions<IACPOptionOptions>>, opts: IEnabableCategoryOptions<IACPOptionOptions>): ACPCategory =>
            {
                return new ACPCategory(node, opts);
            });
    }

    public get Type(): string
    {
        return "option";
    }

    public get TranslationCategory(): string
    {
        return "wcf.acp.option";
    }
}