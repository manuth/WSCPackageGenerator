import { isNullOrUndefined } from "util";
import { Package } from "../Package";
import { Instruction } from "./Instruction";
import { InstructionCollection } from "./InstructionCollection";

/**
 * Represents a collection of instructions.
 */
export class InstructionSet extends InstructionCollection<Instruction>
{
    /**
     * The package the collection belongs to.
     */
    private package: Package;

    /**
     * The directory to save the set to.
     */
    private directory: string = "components";

    /**
     * Initializes a new instance of the `InstructionSet` class.
     */
    public constructor($package: Package)
    {
        super();
        this.Package = $package;
    }

    /**
     * Gets or sets the package the collection belongs to.
     */
    public get Package()
    {
        return this.package;
    }

    public set Package(value)
    {
        this.package = value;
    }

    /**
     * Gets or sets the directory to save the components of this set.
     */
    public get Directory()
    {
        return this.directory;
    }

    public set Directory(value)
    {
        this.directory = value;
    }

    public push(...items: Instruction[]): number
    {
        for (let item of items)
        {
            if (!isNullOrUndefined(item))
            {
                item.Collection = this;
            }
        }

        return super.push(...items);
    }
}