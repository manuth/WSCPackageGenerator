import NamedObjectDeletionInstruction from "../Automation/NamedObjectDeletionInstruction";

/**
 * Represents an instruction that provides template-listeners to delete.
 */
export default class TemplateListenersDeletionInstruction extends NamedObjectDeletionInstruction
{
    /**
     * Initializes a new instance of the `TemplateListenersDeletionInstruction` class.
     */
    public constructor(options: Partial<TemplateListenersDeletionInstruction> = { })
    {
        super(options);
    }

    /**
     * Gets the names of the template-listeners to delete.
     */
    public get Names(): string[]
    {
        return super.Names;
    }
}