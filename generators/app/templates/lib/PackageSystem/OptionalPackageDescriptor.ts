import IOptionalPackageDescriptor from "./IOptionalPackageDescriptor";
import PackageDescriptor from "./PackageDescriptor";

/**
 * Provides an abstraction of an optional package.
 *
 * Keep in mind to provide the optional package using `Package.AdditionalFiles`.
 */
export default class OptionalPackageDescriptor extends PackageDescriptor implements IOptionalPackageDescriptor
{
    /**
     * The path to the path to the package.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the `OptionalPackageDescriptor` class.
     */
    public constructor(options: IOptionalPackageDescriptor)
    {
        super(options);
    }

    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }
}