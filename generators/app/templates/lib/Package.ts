import Component from "./Component";
import TranslationNode from "./Globalization/TranslationNode";
import InstructionCollection from "./Automation/InstructionCollection";
import UpdatesCollection from "./Automation/UpdatesCollection";
import Instruction from "./Automation/Instruction";
import UpdateInstructionCollection from "./Automation/UpdateInstructionCollection";
import { isNullOrUndefined } from "util";
import IPackage from "./IPackage";
import Option from "./ControlPanel/Option";
import ErrorMessageNode from "./Globalization/ErrorMessageNode";
import FilesInstruction from "./FilesInstruction";
import FileSystemInstruction from "./Automation/FileSystemInstruction";

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

    /**
     * Gets the options provided by this package.
     */
    public get Options(): { [id: string]: Option }
    {
        return this.InstallInstructions.Options;
    }

    /**
     * Gets the error-messages provided by this package
     */
    public get ErrorMessages(): { [id: string]: ErrorMessageNode }
    {
        return this.InstallInstructions.ErrorMessages;
    }
}