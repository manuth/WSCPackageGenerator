import { ErrorMessageNode } from "./ErrorMessageNode";
import { ITranslationsInstructionOptions } from "../ITranslationsInstructionOptions";

/**
 * Provides options for the `IErrorMessagesInstruction` interface.
 */
export interface IErrorMessagesInstructionOptions extends ITranslationsInstructionOptions
{
    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    TranslationNodes: ErrorMessageNode[];
}