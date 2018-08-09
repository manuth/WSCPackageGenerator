import ITemplateListenersInstructionOptions from "./ITemplateListenersInstructionOptions";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides a set of template-listeners.
 */
export default interface ITemplateListenersInstruction extends IFileInstruction, Required<ITemplateListenersInstructionOptions>
{

}