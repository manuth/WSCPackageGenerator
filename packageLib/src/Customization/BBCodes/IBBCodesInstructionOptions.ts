import { IFileInstructionOptions } from "../../Automation/IFileInstructionOptions";
import { BBCode } from "./BBCode";

/**
 * Provides options for the `IBBCodesInstruction` interface.
 */
export interface IBBCodesInstructionOptions extends IFileInstructionOptions
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