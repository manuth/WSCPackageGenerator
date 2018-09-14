import { Package } from "../Package";
import { InstructionSet } from "./InstructionSet";

/**
 * Represents a collection of instructions for updating a package.
 */
export class UpdateInstructionSet extends InstructionSet
{
    /**
     * The version to update the package from.
     */
    private fromVersion: string;

    /**
     * Initializes a new instance of the `UpdateInstructionSet` class.
     */
    public constructor($package: Package, fromVersion: string)
    {
        super($package);
        this.FromVersion = fromVersion;
    }

    /**
     * Gets or sets the version to update the package from.
     */
    public get FromVersion()
    {
        return this.fromVersion;
    }

    public set FromVersion(value)
    {
        this.fromVersion = value;
    }
}