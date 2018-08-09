import IRequiredPackageDescriptorOptions from "./IRequiredPackageDescriptorOptions";
import PackageDescriptor from "./PackageDescriptor";
import { isNullOrUndefined } from "util";
import IRequiredPackageDescriptor from "./IRequiredPackageDescriptor";

/**
 * Provides an abstraction of a package.
 */
export default class RequiredPackageDescriptor extends PackageDescriptor implements IRequiredPackageDescriptor
{
    /**
     * The minimal version the package must have.
     */
    private minVersion: string;

    /**
     * Initializes a new isntance of the `RequiredPackageDescriptor` class.
     */
    public constructor(options: IRequiredPackageDescriptorOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.MinVersion))
        {
            this.minVersion = options.MinVersion;
        }
    }

    public get MinVersion(): string
    {
        return this.minVersion;
    }

    public set MinVersion(value: string)
    {
        this.minVersion = value;
    }
}