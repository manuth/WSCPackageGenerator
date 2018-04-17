import Instruction from "../Automation/Instruction";
import TemplateListener from "./TemplateListener";
import FileInstruction from "../Automation/FileInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides a set of template-listeners.
 */
export default class TemplateListenersInstruction extends FileInstruction
{
    /**
     * The template-listeners provided by the instruction.
     */
    private templateListeners: TemplateListener[] = [];

    /**
     * Initializes a new instance of the `TemplateListenersInstruction` class.
     */
    public constructor(options: Partial<TemplateListenersInstruction> = { })
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "templateListeners.xml";
        }

        if (!isNullOrUndefined(options.TemplateListeners))
        {
            this.templateListeners.push(...options.TemplateListeners);
        }
    }

    /**
     * Gets the template-listeners provided by the instruction.
     */
    public get TemplateListeners(): TemplateListener[]
    {
        return this.templateListeners;
    }
}