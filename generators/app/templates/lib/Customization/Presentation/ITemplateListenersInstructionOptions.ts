import { IDeleteInstruction } from "../../Automation/IDeleteInstruction";
import { IFileInstructionOptions } from "../../Automation/IFileInstructionOptions";
import { TemplateListener } from "./TemplateListener";

/**
 * Provides options for the `ITemplateListenersInstruction` interface.
 */
export interface ITemplateListenersInstructionOptions extends IFileInstructionOptions, IDeleteInstruction
{
    /**
     * Gets the template-listeners provided by the instruction.
     */
    TemplateListeners: TemplateListener[];
}