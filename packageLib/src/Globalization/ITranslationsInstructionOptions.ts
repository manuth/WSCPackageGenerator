import { IFileInstructionOptions } from "../Automation/IFileInstructionOptions";
import { TranslationNode } from "./TranslationNode";

/**
 * Provides options for the `ITranslationsInstruction` interface.
 */
export interface ITranslationsInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    TranslationNodes: TranslationNode[];
}