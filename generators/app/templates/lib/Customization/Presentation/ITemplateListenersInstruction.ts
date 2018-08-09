import IFileInstruction from "../../Automation/IFileInstruction";
import ITemplateListenersInstructionOptions from "./ITemplateListenersInstructionOptions";

/**
 * Represents an instruction that provides a set of template-listeners.
 */
export default interface ITemplateListenersInstruction extends IFileInstruction, Required<ITemplateListenersInstructionOptions>
{

}