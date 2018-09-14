import { IConflictingPackageDescriptorOptions } from "./IConflictingPackageDescriptorOptions";
import { PackageDescriptor } from "./PackageDescriptor";

/**
 * Provides the abstraction of a package which causes a conflict.
 */
export class ConflictingPackageDescriptor extends PackageDescriptor
{
    /**
     * The version of the package.
     */
    private version: string;

    /**
     * Initializes a new instance of the `ConflictingPackageDescriptor` class.
     */
    public constructor(options: IConflictingPackageDescriptorOptions)
    {
        super(options);
        this.Version = options.Version;
    }

    /**
     * Gets or sets the version of the package.
     */
    public get Version(): string
    {
        return this.version;
    }

    public set Version(value: string)
    {
        this.version = value;
    }
}