import IDeleteInstruction from "../../Automation/IDeleteInstruction";
import IFileInstruction from "../../Automation/IFileInstruction";
import TemplateListener from "./TemplateListener";

/**
 * Represents an instruction that provides a set of template-listeners.
 */
export default interface ITemplateListenersInstruction extends IFileInstruction, IDeleteInstruction
{
    /**
     * Gets the template-listeners provided by the instruction.
     */
    TemplateListeners: TemplateListener[];
}