import Instruction from "./Instruction";
import InstructionCollection from "./InstructionCollection";
import Package from "../PackageSystem/Package";

/**
 * Represents a set of `InstructionCollection`s.
 */
export default class InstructionCollectionCollection<T extends InstructionCollection<Instruction>> extends Array<T>
{
    /**
     * The package this collection belongs to.
     */
    private package: Package;

    /**
     * Initializes a new instance of the `InstructionCollection` class.
     * 
     * @param pkg
     * The package the collection belongs to.
     */
    public constructor(pkg: Package)
    {
        super();
        this.package = pkg;
    }

    /**
     * Gets the package this collection belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
    }

    public push(...items: T[]): number
    {
        for (let item of items)
        {
            item.Package = this.Package;
        }

        return super.push(...items);
    }
}