import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";

/**
 * Provides options for the `IRequiredPackageDescriptor` interface.
 */
export interface IRequiredPackageDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * Gets or sets the minimal version the package must have.
     */
    MinVersion: string;
}