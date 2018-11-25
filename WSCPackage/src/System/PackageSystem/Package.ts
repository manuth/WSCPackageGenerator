import { isNullOrUndefined } from "util";
import { Component } from "./Component";
import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor";
import { FileDescriptor } from "./FileDescriptor";
import { InstructionSet } from "./Instructions/InstructionSet";
import { UpdateInstructionSet } from "./Instructions/UpdateInstructionSet";
import { IPackageOptions } from "./IPackageOptions";
import { OptionalPackageDescriptor } from "./OptionalPackageDescriptor";
import { Person } from "./Person";
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor";

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
    private updateSets: UpdateInstructionSet[] = [];

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: IPackageOptions)
    {
        super({
            Name: options.Name,
            DisplayName: options.DisplayName,
            Version: options.Version,
            Author: options.Author || new Person(
                {
                    Name: null
                }),
            CreationDate: options.CreationDate,
            Description: options.Description,
            License: options.License
        });

        this.Identifier = options.Identifier;

        if (!isNullOrUndefined(options.AdditionalFiles))
        {
            for (let additionalFile of options.AdditionalFiles)
            {
                this.AdditionalFiles.push(new FileDescriptor(additionalFile));
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
                let updateInstructionSet: UpdateInstructionSet = new UpdateInstructionSet(this, updateSet.FromVersion);

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
    public get Identifier(): string
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    /**
     * Gets a set of files which will be added to the package.
     */
    public get AdditionalFiles(): FileDescriptor[]
    {
        return this.additionalFiles;
    }

    /**
     * Gets a set of packages which are required by this package.
     */
    public get RequiredPackages(): RequiredPackageDescriptor[]
    {
        return this.requiredPackages;
    }

    /**
     * Gets a set of packages which cause a conflict with this package.
     */
    public get ConflictingPackages(): ConflictingPackageDescriptor[]
    {
        return this.conflictingPackages;
    }

    /**
     * Gets a set of packages which can be installed additionally.
     */
    public get OptionalPackages(): OptionalPackageDescriptor[]
    {
        return this.optionalPackages;
    }

    /**
     * Gets a set of instructions for installing the package.
     */
    public get InstallSet(): InstructionSet
    {
        return this.installSet;
    }

    /**
     * Gets a set of instructions to execute when updating from a specific version.
     */
    public get UpdateSets(): UpdateInstructionSet[]
    {
        return this.updateSets;
    }

    /**
     * Looks for an object with the specified id.
     *
     * @param id
     * The id of the object to get.
     *
     * @returns
     * The object with the specified id.
     */
    public GetObjectByID(id: string): any
    {
        for (let instruction of this.InstallSet)
        {
            let objects: { [id: string]: any } = instruction.ObjectsByID;

            if (id in objects)
            {
                return objects[id];
            }
        }
    }
}