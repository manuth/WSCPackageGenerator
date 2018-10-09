import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";

/**
 * Provides options for the `PackageFileDescriptor` class.
 */
export interface IPackageFileDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * The filename of the package
     */
    FileName?: string;
}