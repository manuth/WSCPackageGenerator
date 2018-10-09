import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";

/**
 * Provides options for the `RequiredPackageDescriptorOptions` class.
 */
export interface IRequiredPackageDescriptorOptions extends IPackageFileDescriptorOptions
{
    /**
     * The minimal version of the package which must bee installed.
     */
    MinVersion: string;
}