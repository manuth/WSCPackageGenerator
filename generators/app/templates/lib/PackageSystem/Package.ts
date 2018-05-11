import Component from "./Component";
import ConflictingPackageDescriptor from "./ConflictingPackageDescriptor";
import ErrorMessageNode from "../Globalization/Errors/ErrorMessageNode";
import FilesInstruction from "../FilesInstruction";
import FileSystemInstruction from "../Automation/FileSystemInstruction";
import Instruction from "../Automation/Instruction";
import InstructionCollection from "../Automation/InstructionCollection";
import IPackage from "./IPackage";
import Option from "../Options/ControlPanel/Option";
import OptionalPackageDescriptor from "./OptionalPackageDescriptor";
import RequiredPackageDescriptor from "./RequiredPackageDescriptor";
import TranslationNode from "../Globalization/TranslationNode";
import UpdateInstructionCollection from "../Automation/UpdateInstructionCollection";
import UpdatesCollection from "../Automation/UpdatesCollection";
import { isNullOrUndefined } from "util";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default class Package extends Component implements IPackage
{
    /**
     * The identifier of the package.
     */
    private identifier: string = "";

    /**
     * The instructions which is used for installing the packge.
     */
    private installInstructions: InstructionCollection<Instruction> = new InstructionCollection(this);

    /**
     * A set of instructions for updating the package.
     */
    private updateInstructions: UpdateInstructionCollection<Instruction>[] = new UpdatesCollection(this);

    /**
     * Additional files which are copied to the package.
     */
    private additionalFiles: FileSystemInstruction[] = new InstructionCollection(this);

    /**
     * The packages which are required for installing this package.
     */
    private requiredPackages: RequiredPackageDescriptor[] = [];

    /**
     * Optional packages provided by this package.
     */
    private optionalPackages: OptionalPackageDescriptor[] = [];

    /**
     * The packages which are conflicting with this package.
     */
    private conflictingPackages: ConflictingPackageDescriptor[] = [];

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: IPackage)
    {
        super(options);
        this.identifier = options.Identifier;

        if (isNullOrUndefined(options.Date))
        {
            this.Date = new Date();
        }

        if (!isNullOrUndefined(options.InstallInstructions))
        {
            this.installInstructions.push(...options.InstallInstructions);
        }

        if (!isNullOrUndefined(options.UpdateInstructions))
        {
            for (let updateInstruction of options.UpdateInstructions)
            {
                let updateInstructionCollection = new UpdateInstructionCollection(this, updateInstruction.FromVersion);

                if (!isNullOrUndefined(updateInstruction.Destination))
                {
                    updateInstructionCollection.Destination = updateInstruction.Destination;
                }

                for (let instruction of updateInstruction.Instructions)
                {
                    updateInstructionCollection.push(instruction);
                }
                
                this.updateInstructions.push(updateInstructionCollection);
            }
        }

        if (!isNullOrUndefined(options.AdditionalFiles))
        {
            this.additionalFiles.push(...options.AdditionalFiles);
        }

        if (!isNullOrUndefined(options.RequiredPackages))
        {
            this.requiredPackages.push(...options.RequiredPackages);
        }

        if (!isNullOrUndefined(options.OptionalPackages))
        {
            this.optionalPackages.push(...options.OptionalPackages);
        }

        if (!isNullOrUndefined(options.ConflictingPackages))
        {
            this.conflictingPackages.push(...options.ConflictingPackages);
        }
    }

    public get Identifier(): string
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    public get InstallInstructions(): InstructionCollection<Instruction>
    {
        return this.installInstructions;
    }

    public get UpdateInstructions(): UpdateInstructionCollection<Instruction>[]
    {
        return this.updateInstructions;
    }

    public get AdditionalFiles(): FileSystemInstruction[]
    {
        return this.additionalFiles;
    }

    public get RequiredPackages(): RequiredPackageDescriptor[]
    {
        return this.requiredPackages;
    }

    public get OptionalPackages(): OptionalPackageDescriptor[]
    {
        return this.optionalPackages;
    }

    public get ConflictingPackages(): ConflictingPackageDescriptor[]
    {
        return this.conflictingPackages;
    }

    /**
     * Gets the options provided by this package.
     */
    public get Options(): { [id: string]: Option }
    {
        return this.InstallInstructions.Options;
    }

    /**
     * Gets the translations provided by this package
     */
    public get Translations(): { [id: string]: TranslationNode }
    {
        return this.InstallInstructions.Translations;
    }

    /**
     * Gets the error-messages provided by this package
     */
    public get ErrorMessages(): { [id: string]: ErrorMessageNode }
    {
        return this.InstallInstructions.ErrorMessages;
    }
}