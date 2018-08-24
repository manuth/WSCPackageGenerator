import { IInstructionOptions } from "./IInstructionOptions";
import { Package } from "../PackageSystem/Package";

/**
 * Represents an instruction for installing a package.
 */
export abstract class Instruction implements IInstructionOptions
{
    /**
     * The package this instruction belongs to.
     */
    private package: Package = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: Partial<IInstructionOptions> = { })
    {
    }

    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
    }
}