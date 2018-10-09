import { IBBCodeOptions } from "../../../Customization/BBCodes/IBBCodeOptions";
import { INamedObject } from "../../../INamedObject";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";

/**
 * Provides options for the `BBCodeInstruction` class.
 */
export interface IBBCodeInstructionOptions extends IDeleteInstructionOptions<INamedObject>, ILocalizationInstructionOptions
{
    /**
     * The bb-codes provided by this instruction.
     */
    BBCodes: IBBCodeOptions[];
}