import InstructionCollection from "./InstructionCollection";
import Package from "../Package";

export default class UpdateInstructionCollection extends InstructionCollection
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

    /**
     * Gets or sets the version of the package this `UpdateInstructionCollection` can be executed on.
     */
    public get FromVersion(): string
    {
        return this.fromVersion;
    }

    public set FromVersion(value: string)
    {
        this.fromVersion = value;
    }
}