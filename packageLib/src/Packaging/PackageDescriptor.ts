import { isNullOrUndefined } from "util";
import { IPackageDescriptor } from "./IPackageDescriptor";
import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";

/**
 * Provides an abstraction of a package.
 */
export abstract class PackageDescriptor implements IPackageDescriptor
{
    /**
     * The identifier of the package.
     */
    private identifier: string;

    /**
     * Initializes a new instance of the `PackageDescriptor` class.
     */
    public constructor(options: IPackageDescriptorOptions)
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