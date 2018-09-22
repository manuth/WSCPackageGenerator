import { TemplateListener } from "../../../../Customization/Presentation/TemplateListener";
import { Instruction } from "../../Instruction";
import { ITemplateListenerInstructionOptions } from "./ITemplateListenerInstructionOptions";

/**
 * Represents an instruction which provides template-listeners.
 */
export class TemplateListenerInstruction extends Instruction
{
    /**
     * The template-listeners provided by the instruction.
     */
    private templateListeners: TemplateListener[];

    /**
     * Initializes a new instance of the `TemplateListenerInstruction` class.
     */
    public constructor(options: ITemplateListenerInstructionOptions)
    {
        super(options);

        for (let templateListener of options.TemplateListeners)
        {
            this.TemplateListeners.push(new TemplateListener(templateListener));
        }
    }

    public get Type(): string
    {
        return "templateListener";
    }

    /**
     * Gets or sets the template-listeners provided by the instruction.
     */
    public get TemplateListeners(): TemplateListener[]
    {
        return this.templateListeners;
    }
}