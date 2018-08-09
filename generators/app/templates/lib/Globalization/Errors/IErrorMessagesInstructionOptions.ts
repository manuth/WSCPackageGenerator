import ErrorMessageNode from "./ErrorMessageNode";
import ITranslationsInstructionOptions from "../ITranslationsInstruction";

/**
 * Provides options for the `IErrorMessagesInstruction` interface.
 */
export default interface IErrorMessagesInstructionOptions extends ITranslationsInstructionOptions
{
    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    TranslationNodes: ErrorMessageNode[];
}