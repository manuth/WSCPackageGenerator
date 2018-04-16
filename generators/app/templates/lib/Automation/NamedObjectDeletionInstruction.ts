import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that deletes a set of named objects.
 */
export default abstract class NamedObjectDeletionInstruction
{
    /**
     * The names of the objects to delete.
     */
    private names: string[] = [];

    /**
     * Initializes a new instance of the `NamedObjectDeletionInstruction` class.
     */
    protected constructor(options: Partial<NamedObjectDeletionInstruction> = { })
    {
        if (!isNullOrUndefined(options.Names))
        {
            this.names.push(...options.Names);
        }
    }

    /**
     * Gets the names of the objects to delete.
     */
    public get Names(): string[]
    {
        return this.names;
    }
}