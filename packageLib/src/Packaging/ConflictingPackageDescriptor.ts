import { IRequiredPackageDescriptorOptions } from "./IRequiredPackageDescriptorOptions";
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor";

/**
 * Provides an abstraction of a conflicting package.
 */
export class ConflictingPackageDescriptor extends RequiredPackageDescriptor
{
    /**
     * Initializes a new instance of the `ConflictingPackageDescriptor`.
     */
    public constructor(options: IRequiredPackageDescriptorOptions)
    {
        super(options);
    }
}