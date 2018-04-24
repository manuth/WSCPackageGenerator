import IPackageDescriptor from "./IPackageDescriptor";

/**
 * Provides an abstraction of an optional package.
 * 
 * Keep in mind to provide the optional package using `Package.AdditionalFiles`.
 */
export default interface IOptionalPackageDescriptor extends IPackageDescriptor
{
    /**
     * Gets or sets the path to the path to the package.
     */
    FileName: string;
}