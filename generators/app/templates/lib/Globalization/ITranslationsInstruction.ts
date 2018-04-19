import IFileInstruction from "../Automation/IFileInstruction";
import TranslationNode from "./TranslationNode";

/**
 * Represents an instruction that provides `Translation`s.
 */
export default interface ITranslationsInstruction extends IFileInstruction
{
    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    TranslationNodes: TranslationNode[];
}