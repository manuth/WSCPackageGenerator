import { Instruction } from "./Instruction";
import { InstructionCollection } from "./InstructionCollection";
import { Package } from "../Package";
import { isNullOrUndefined } from "util";

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
     * The directory to save the components of this set.
     */
    private directory: string = ".";

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

    /**
     * Joins the paths and returns the path contained by a component-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    public MakeComponentPath(...path: string[])
    {
        return this.Package.MakePackageSourcePath(this.Directory, this.Package.ComponentPath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by a style-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    public MakeStylePath(...path: string[])
    {
        return this.Package.MakePackageSourcePath(this.Directory, this.Package.StylePath, ...path);
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