import BBCode from "./BBCode";
import IFileInstructionOptions from "../../Automation/IFileInstructionOptions";

/**
 * Provides options for the `IBBCodesInstruction` interface.
 */
export default interface IBBCodesInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets or sets the directory to save the language-files to.
     */
    TranslationsDirectory?: string;

    /**
     * Gets the bb-codes provided by the instruction.
     */
    BBCodes: BBCode[];
}