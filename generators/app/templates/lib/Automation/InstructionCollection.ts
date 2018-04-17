import Instruction from "./Instruction";
import Package from "../Package";

/**
 * Rerpesents a set of instructions.
 */
export default class InstructionCollection extends Array<Instruction>
{
    /**
     * The package this collection belongs to.
     */
    private package: Package;

    /**
     * Initializes a new instance of the `InstructionCollection` class.
     * 
     * @param pkg
     * The package this collection belongs to.
     */
    public constructor(pkg: Package)
    {
        super();
        this.package = pkg;
    }

    /**
     * Gets or sets the package this collection belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
    }

    public push(...items: Instruction[]): number
    {
        for (let item of items)
        {
            item.Package = this.Package;
        }

        return super.push(...items);
    }
}