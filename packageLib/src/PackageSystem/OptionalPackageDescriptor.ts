import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
import { PackageFileDescriptor } from "./PackageFileDescriptor";

/**
 * Provides an abstraction of an optional package.
 */
export class OptionalPackageDescriptor extends PackageFileDescriptor
{
    /**
     * Initializes a new instance of the `OptionalPackageDescriptor` class.
     */
    public constructor(options: Required<IPackageFileDescriptorOptions>)
    {
        super(options);
    }
}