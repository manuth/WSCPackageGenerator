/**
 * Represents an instruction for deleting named components.
 */
export default interface IDeleteInstruction
{
    /**
     * Gets a set of names of objects to delete.
     */
    ObjectsToDelete?: string[];
}