import Package from "../Package";
import { isNull } from "util";

/**
 * Represents an instruction for installing a package.
 */
export default abstract class Instruction
{
    /**
     * The package this instruction belongs to.
     */
    private package: Package = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: Partial<Instruction> = { })
    {
        if (!isNull(options.Package))
        {
            this.package = options.Package;
        }
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