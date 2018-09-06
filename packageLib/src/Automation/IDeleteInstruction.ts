/**
 * Represents an instruction for deleting named components.
 */
export interface IDeleteInstruction
{
    /**
     * Gets a set of names of objects to delete.
     */
    ObjectsToDelete?: string[];
}