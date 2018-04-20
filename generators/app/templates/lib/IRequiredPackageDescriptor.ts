import IPackageDescriptor from "./IPackageDescriptor";

/**
 * Provides an abstraction of a required package.
 */
export default interface IRequiredPackageDescriptor extends IPackageDescriptor
{
    /**
     * Gets or sets the minimal version the package must have.
     */
    MinVersion: string;
}