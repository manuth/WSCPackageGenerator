import BBCode from "./BBCode";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides bb-codes.
 */
export default interface IBBCodesInstruction extends IFileInstruction
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