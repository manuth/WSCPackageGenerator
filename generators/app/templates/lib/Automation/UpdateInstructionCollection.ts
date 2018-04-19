import InstructionCollection from "./InstructionCollection";
import IUpdateInstructionCollection from "./IUpdateInstructionCollection";
import Package from "../Package";

/**
 * Represents a set of `Instruction`s for updating a package.
 */
export default class UpdateInstructionCollection extends InstructionCollection implements IUpdateInstructionCollection
{
    /**
     * The version of the package this `UpdateInstructionCollection` can be executed on.
     */
    private fromVersion: string;

    /**
     * Initializes a new instance of the `UpdateInstructionCollection`.
     * 
     * @param pkg
     * The package this collection belongs to.
     * 
     * @param fromVersion
     * The version this update can be applied to.
     */
    public constructor(pkg: Package, fromVersion: string, destination = fromVersion)
    {
        super(pkg, destination);
        this.fromVersion = fromVersion;
    }

    public get FromVersion(): string
    {
        return this.fromVersion;
    }

    public set FromVersion(value: string)
    {
        this.fromVersion = value;
    }
}