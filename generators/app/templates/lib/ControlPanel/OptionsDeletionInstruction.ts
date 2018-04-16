import NamedObjectDeletionInstruction from "../Automation/NamedObjectDeletionInstruction";

/**
 * Represents an instruction that provides options to delete.
 */
export default class OptionsDeletionInstruction extends NamedObjectDeletionInstruction
{
    /**
     * Initializes a new instance of the `OptionsDeletionInstruction` class.
     */
    public constructor(options: Partial<OptionsDeletionInstruction> = { })
    {
        super(options);
    }

    /**
     * Gets the names of the options to delete.
     */
    public get Names(): string[]
    {
        return super.Names;
    }
}