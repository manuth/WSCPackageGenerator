import InstructionCollectionCollection from "./InstructionCollectionCollection";
import UpdateInstructionCollection from "./UpdateInstructionCollection";
import Package from "../PackageSystem/Package";
import Instruction from "./Instruction";

/**
 * Represents a set of update-routines.
 */
export default class UpdatesCollection extends InstructionCollectionCollection<UpdateInstructionCollection<Instruction>>
{
    /**
     * Initializes a new instance of the `UpdatesCollection` class.
     * 
     * @param pkg
     * The package the collection belongs to.
     */
    public constructor(pkg: Package)
    {
        super(pkg);
    }
}