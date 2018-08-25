import { Component } from "./Component";
import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor";
import { FileDescriptor } from "./FileDescriptor";
import { InstructionSet } from "./Instructions/InstructionSet";
import { IPackageOptions } from "./IPackageOptions";
import { OptionalPackageDescriptor } from "../Packaging/OptionalPackageDescriptor";
import * as Path from "path";
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor";
import { UpdateInstructionSet } from "./Instructions/UpdateInstructionSet";
import { isNullOrUndefined } from "util";

/**
 * Represents an extension-package.
 */
export class Package extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string;

    /**
     * The path relative to the project-root to save temporary files to.
     */
    private objectPath: string = "obj";

    /**
     * The path relative to the `objectPath` to save the temporary package to.
     */
    private packageSourcePath: string = "package";

    /**
     * The path relative to the `objectPath` to save temporary styles to.
     */
    private styleSourcePath: string = "styles";

    /**
     * The path relative to the package-root to save the components to.
     */
    private componentPath: string = "components";

    /**
     * The path relative to the package-root to save the styles to.
     */
    private stylePath: string = "styles";

    /**
     * The path relative to the project-root to save the package to.
     */
    private destinationPath: string = "bin";

    /**
     * A set of files which will be added to the package.
     */
    private additionalFiles: FileDescriptor[] = [];

    /**
     * A set of packages which are required by this package.
     */
    private requiredPackages: RequiredPackageDescriptor[] = [];

    /**
     * A set of packages which cause a conflict with this package.
     */
    private conflictingPackages: ConflictingPackageDescriptor[] = [];

    /**
     * A set of packages which can be installed additionally.
     */
    private optionalPackages: OptionalPackageDescriptor[] = [];

    /**
     * A set of instructions for installing the package.
     */
    private installSet: InstructionSet = new InstructionSet(this);

    /**
     * A set of instructions to execute when updating from a specific version.
     */
    private updateSets: UpdateInstructionSet[];

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: IPackageOptions)
    {
        super({
            Name: options.Name || require("../../package.json").name,
            DisplayName: options.DisplayName,
            Version: options.Version || require("../../package.json").version,
            Author: options.Author,
            CreationDate: options.CreationDate,
            Description: options.Description,
            License: options.License
        });

        this.Identifier = options.Identifier;
        
        if (!isNullOrUndefined(options.ObjectPath))
        {
            this.ObjectPath = options.ObjectPath;
        }
        
        if (!isNullOrUndefined(options.PackageSourcePath))
        {
            this.PackageSourcePath = options.PackageSourcePath;
        }
        
        if (!isNullOrUndefined(options.StyleSourcePath))
        {
            this.StyleSourcePath = options.StyleSourcePath;
        }
        
        if (!isNullOrUndefined(options.ComponentPath))
        {
            this.ComponentPath = options.ComponentPath;
        }
        
        if (!isNullOrUndefined(options.StylePath))
        {
            this.StylePath = options.StylePath;
        }
        
        if (!isNullOrUndefined(options.DestinationPath))
        {
            this.DestinationPath = options.DestinationPath;
        }
        
        if (!isNullOrUndefined(options.DestinationPath))
        {
            for (let additionalFile of options.AdditionalFiles)
            {
                this.AddidionalFiles.push(new FileDescriptor(additionalFile));
            }
        }
        
        if (!isNullOrUndefined(options.RequiredPackages))
        {
            for (let requiredPackage of options.RequiredPackages)
            {
                this.RequiredPackages.push(new RequiredPackageDescriptor(requiredPackage));
            }
        }
        
        if (!isNullOrUndefined(options.ConflictingPackages))
        {
            for (let conflictingPackage of options.ConflictingPackages)
            {
                this.ConflictingPackages.push(new ConflictingPackageDescriptor(conflictingPackage));
            }
        }
        
        if (!isNullOrUndefined(options.OptionalPackages))
        {
            for (let optionalPackage of options.OptionalPackages)
            {
                this.OptionalPackages.push(new OptionalPackageDescriptor(optionalPackage));
            }
        }
        
        this.InstallSet.push(...options.InstallSet.Instructions);

        if (!isNullOrUndefined(options.InstallSet.Directory))
        {
            this.InstallSet.Directory = options.InstallSet.Directory;
        }

        if (!isNullOrUndefined(options.UpdateSets))
        {
            for (let updateSet of options.UpdateSets)
            {
                let updateInstructionSet = new UpdateInstructionSet(this, updateSet.FromVersion);

                if (!isNullOrUndefined(updateSet.Directory))
                {
                    updateInstructionSet.Directory = updateSet.Directory;
                }

                updateInstructionSet.push(...updateSet.Instructions);
                this.UpdateSets.push(updateInstructionSet);
            }
        }
    }

    /**
     * Gets or sets the identifier of the package.
     */
    public get Identifier()
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    /**
     * Gets or sets the path relative to the project-root to save temporary files to.
     */
    public get ObjectPath()
    {
        return this.objectPath;
    }

    public set ObjectPath(value)
    {
        this.objectPath = value;
    }

    /**
     * Gets or sets the path relative to the `objectPath` to save the temporary package to.
     */
    public get PackageSourcePath()
    {
        return this.packageSourcePath;
    }

    public set PackageSourcePath(value)
    {
        this.packageSourcePath = value;
    }

    /**
     * Gets or sets the `objectPath` to save temporary styles to.
     */
    public get StyleSourcePath()
    {
        return this.styleSourcePath;
    }

    public set StyleSourcePath(value)
    {
        this.styleSourcePath = value;
    }

    /**
     * Gets or sets the path relative to the package-root to save the components to.
     */
    public get ComponentPath()
    {
        return this.componentPath;
    }

    public set ComponentPath(value)
    {
        this.componentPath = value;
    }

    /**
     * Gets or sets the path relative to the package-root to save the styles to.
     */
    public get StylePath()
    {
        return this.stylePath;
    }

    public set StylePath(value)
    {
        this.stylePath = value;
    }

    /**
     * Gets or sets the path relative to the project-root to save the package to.
     */
    public get DestinationPath(): string
    {
        return this.destinationPath;
    }

    public set DestinationPath(value)
    {
        this.destinationPath = value;
    }

    /**
     * Gets a set of files which will be added to the package.
     */
    public get AddidionalFiles()
    {
        return this.additionalFiles;
    }

    /**
     * Gets a set of packages which are required by this package.
     */
    public get RequiredPackages()
    {
        return this.requiredPackages;
    }

    /**
     * Gets a set of packages which cause a conflict with this package.
     */
    public get ConflictingPackages()
    {
        return this.conflictingPackages;
    }

    /**
     * Gets a set of packages which can be installed additionally.
     */
    public get OptionalPackages()
    {
        return this.optionalPackages;
    }

    /**
     * Gets a set of instructions for installing the package.
     */
    public get InstallSet()
    {
        return this.installSet;
    }

    /**
     * Gets a set of instructions to execute when updating from a specific version.
     */
    public get UpdateSets()
    {
        return this.updateSets;
    }
    
    /**
     * Joins the paths and returns the path contained by a object-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    public MakeObjectPath(...path: string[])
    {
        return Path.join(this.ObjectPath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by a `PackageSource`-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    public MakePackageSourcePath(...path: string[])
    {
        return this.MakeObjectPath(this.PackageSourcePath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by a `StyleSource`-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    public MakeStyleSourcePath(...path: string[])
    {
        return this.MakeObjectPath(this.StyleSourcePath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by the destination-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeDestinationPath(...path: string[])
    {
        return Path.join(this.DestinationPath, ...path);
    }
}