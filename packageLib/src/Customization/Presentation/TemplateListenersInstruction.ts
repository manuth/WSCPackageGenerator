import { isNullOrUndefined } from "util";
import { FileInstruction } from "../../Automation/FileInstruction";
import { ITemplateListenersInstruction } from "./ITemplateListenersInstruction";
import { ITemplateListenersInstructionOptions } from "./ITemplateListenersInstructionOptions";
import { TemplateListener } from "./TemplateListener";

/**
 * Represents an instruction that provides a set of template-listeners.
 */
export class TemplateListenersInstruction extends FileInstruction implements ITemplateListenersInstruction
{
    /**
     * A set of names of template-listeners to delete.
     */
    private objectsToDelete: string[] = [];

    /**
     * The template-listeners provided by the instruction.
     */
    private templateListeners: TemplateListener[] = [];

    /**
     * Initializes a new instance of the `TemplateListenersInstruction` class.
     */
    public constructor(options: ITemplateListenersInstructionOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.ObjectsToDelete))
        {
            this.objectsToDelete.push(...options.ObjectsToDelete);
        }

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "templateListeners.xml";
        }

        if (!isNullOrUndefined(options.TemplateListeners))
        {
            this.templateListeners.push(...options.TemplateListeners);
        }
    }

    public get TemplateListeners(): TemplateListener[]
    {
        return this.templateListeners;
    }

    /**
     * Gets a set of names of template-listeners to delete.
     */
    public get ObjectsToDelete(): string[]
    {
        return this.objectsToDelete;
    }
}