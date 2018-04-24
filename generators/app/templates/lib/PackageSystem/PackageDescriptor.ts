import IPackageDescriptor from "./IPackageDescriptor";
import { isNullOrUndefined } from "util";

/**
 * Provides an abstraction of a package.
 */
export default abstract class PackageDescriptor implements IPackageDescriptor
{
    /**
     * The identifier of the package.
     */
    private identifier: string;

    /**
     * Initializes a new instance of the `PackageDescriptor` class.
     */
    public constructor(options: IPackageDescriptor)
    {
        if (!isNullOrUndefined(options.Identifier))
        {
            this.identifier = options.Identifier;
        }
    }

    public get Identifier(): string
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }
}