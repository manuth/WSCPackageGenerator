import IOptionalPackageDescriptorOptions from "./IOptionalPackageDescriptorOptions";
import IPackageDescriptor from "./IPackageDescriptor";

/**
 * Provides an abstraction of an optional package.
 * 
 * Keep in mind to provide the optional package using `Package.AdditionalFiles`.
 */
export default interface IOptionalPackageDescriptor extends IPackageDescriptor, Required<IOptionalPackageDescriptorOptions>
{
}