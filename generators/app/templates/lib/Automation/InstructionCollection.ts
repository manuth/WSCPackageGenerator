import Instruction from "./Instruction";
import Package from "../Package";

/**
 * Represents a set of instructions.
 */
export default class InstructionCollection<T extends Instruction> extends Array<T>
{
    /**
     * The package this collection belongs to.
     */
    private pkg: Package;

    /**
     * Initializes a new instance of the `InstructionsCollection` class.
     * 
     * @param pkg
     * The package this collection belongs to.
     */
    public constructor(pkg: Package)
    {
        super();
        this.pkg = pkg;
    }

    public push(...items: T[])
    {
        for (let item of items)
        {
            item.Package = this.pkg;
        }

        return super.push(...items);
    }
}