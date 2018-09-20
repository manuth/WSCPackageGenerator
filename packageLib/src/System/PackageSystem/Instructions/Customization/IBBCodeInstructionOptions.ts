import { IBBCodeOptions } from "../../../Customization/BBCodes/IBBCodeOptions";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions";
import { IInstructionOptions } from "../IInstructionOptions";

/**
 * Provides options for the `BBCodeInstruction` class.
 */
export interface IBBCodeInstructionOptions extends IInstructionOptions, ILocalizationInstructionOptions
{
    /**
     * The bbcodes provided by this instruction.
     */
    BBCodes: IBBCodeOptions[];
}