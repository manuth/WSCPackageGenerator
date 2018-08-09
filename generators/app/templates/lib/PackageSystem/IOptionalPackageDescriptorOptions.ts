import IPackageDescriptorOptions from "./IPackageDescriptorOptions";

/**
 * Provides options for the `IOptionalPackageDescriptor` interface.
 */
export default interface IOptionalPackageDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * Gets or sets the path to the path to the package.
     */
    FileName: string;
}