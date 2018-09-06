import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
import { PackageDescriptor } from "./PackageDescriptor";
import { isNullOrUndefined } from "util";

/**
 * Provides an abstraction of a package stored in a file.
 */
export class PackageFileDescriptor extends PackageDescriptor
{
    /**
     * The filename of the package
     */
    private fileName: string = null;

    /**
     * Initializes a new instance of the `PackageFileDescriptor` class.
     */
    public constructor(options: IPackageFileDescriptorOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.FileName))
        {
            this.FileName = options.FileName;
        }
    }

    /**
     * The filename of the package.  
     * Please keep in mind to provide the file using the `Package.AdditionalFiles`-property.
     */
    public get FileName()
    {
        return this.fileName;
    }

    public set FileName(value)
    {
        this.fileName = value;
    }
}