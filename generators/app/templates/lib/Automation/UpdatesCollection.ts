import Instruction from "./Instruction";
import InstructionCollectionCollection from "./InstructionCollectionCollection";
import Package from "../PackageSystem/Package";
import UpdateInstructionCollection from "./UpdateInstructionCollection";

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