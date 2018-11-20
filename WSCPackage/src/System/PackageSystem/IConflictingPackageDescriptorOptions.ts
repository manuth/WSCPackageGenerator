import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";

/**
 * Provides options for the `ConflictingPackageDescriptor` class.
 */
export interface IConflictingPackageDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * The version of the package.
     */
    Version: string;
}