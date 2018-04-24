import RequiredPackageDescriptor from "./RequiredPackageDescriptor";
import IRequiredPackageDescriptor from "./IRequiredPackageDescriptor";

/**
 * Provides an abstraction of a conflicting package.
 */
export default class ConflictingPackageDescriptor extends RequiredPackageDescriptor
{
    /**
     * Initializes a new instance of the `ConflictingPackageDescriptor`.
     */
    public constructor(options: IRequiredPackageDescriptor)
    {
        super(options);
    }
}