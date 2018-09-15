/**
 * Represents an instruction which provides items which can be removed.
 */
export interface IRemovableInstruction
{
    /**
     * The items to remove.
     */
    ItemsToRemove: string[];
}