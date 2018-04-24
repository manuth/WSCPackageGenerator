import IInstruction from "./IInstruction";
import Package from "../PackageSystem/Package";

/**
 * Represents an instruction for installing a package.
 */
export default abstract class Instruction implements IInstruction
{
    /**
     * The package this instruction belongs to.
     */
    private package: Package = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: Partial<IInstruction> = { })
    {
    }

    /**
     * Gets or sets the package this instruction belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
    }
}