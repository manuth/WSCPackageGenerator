import { Node } from "../../../NodeSystem/Node";
import { EnabableCategory } from "../../../Options/EnabableCategory";
import { IEnabableCategoryOptions } from "../../../Options/IEnabableCategoryOptions";
import { IOptionOptions } from "../../../Options/IOptionOptions";
import { Option } from "../../../Options/Option";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { OptionInstruction } from "./OptionInstruction";

/**
 * Represents an instruction which provides categories which can be enabled or disabled.
 */
export abstract class EnabableOptionInstruction<TCategory extends EnabableCategory<TOption, TOptionOptions>, TCategoryOptions extends IEnabableCategoryOptions<TOptionOptions>, TOption extends Option, TOptionOptions extends IOptionOptions> extends OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>
{
    /**
     * Initializes a new instance of the `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>` class.
     */
    public constructor(options: INodeSystemInstructionOptions<TCategoryOptions>, generator: (node: Node<TCategory, TCategoryOptions>, options: TCategoryOptions) => TCategory)
    {
        super(options, generator);
    }
}