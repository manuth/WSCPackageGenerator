import { INamedObject } from "../../../INamedObject";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";

/**
 * Provides options for the `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>` class.
 */
export interface IOptionInstructionOptions<T> extends INodeSystemInstructionOptions<T>
{
    /**
     * The categories to delete.
     */
    CategoriesToDelete?: INamedObject[];

    /**
     * The options to delete.
     */
    OptionsToDelete?: INamedObject[];
}