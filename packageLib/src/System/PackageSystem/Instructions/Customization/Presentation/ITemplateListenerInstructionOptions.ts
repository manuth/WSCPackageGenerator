import { ITemplateListenerOptions } from "../../../../Customization/Presentation/ITemplateListenerOptions";
import { IInstructionOptions } from "../../IInstructionOptions";

/**
 * Provides options for the `TemplateListeners
 */
export interface ITemplateListenerInstructionOptions extends IInstructionOptions
{
    /**
     * The template-listeners provided by the instruction.
     */
    TemplateListeners: ITemplateListenerOptions[];
}