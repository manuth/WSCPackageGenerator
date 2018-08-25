import { PackageFileDescriptor } from "./PackageFileDescriptor";

/**
 * Provides options for the `RequiredPackageDescriptorOptions` class.
 */
export interface IRequiredPackageDescriptorOptions extends PackageFileDescriptor
{
    /**
     * The minimal version of the package which must bee installed.
     */
    MinVersion: string;
}