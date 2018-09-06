import { PackageFileDescriptor } from "./PackageFileDescriptor";

/**
 * Provides an abstraction of a required package.
 */
export class RequiredPackageDescriptor extends PackageFileDescriptor
{
    /**
     * The minimal version of the package which must bee installed.
     */
    private minVersion: string;

    /**
     * Gets or sets the minimal version of the package which must bee installed.
     */
    public get MinVersion()
    {
        return this.minVersion;
    }

    public set MinVersion(value)
    {
        this.minVersion = value;
    }
}