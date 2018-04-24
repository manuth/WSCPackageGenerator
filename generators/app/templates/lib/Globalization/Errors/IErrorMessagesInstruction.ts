import ErrorMessageNode from "./ErrorMessageNode";
import ITranslationsInstruction from "../ITranslationsInstruction";

/**
 * Represents an instruction which provides errorg-messages.
 */
export default interface IErrorMessagesInstruction extends ITranslationsInstruction
{
    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    TranslationNodes: ErrorMessageNode[];
}