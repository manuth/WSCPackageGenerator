import Component from "./Component";
import TranslationNode from "./Globalization/TranslationNode";
import InstructionCollection from "./Automation/InstructionCollection";
import UpdatesCollection from "./Automation/UpdatesCollection";
import Instruction from "./Automation/Instruction";
import UpdateInstructionCollection from "./Automation/UpdateInstructionCollection";
import { isNullOrUndefined } from "util";
import IPackage from "./IPackage";

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
    private installInstructions: InstructionCollection = new InstructionCollection(this);

    /**
     * A set of instructions for updating the package.
     */
    private updateInstructions: UpdateInstructionCollection[] = new UpdatesCollection(this);

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
            }
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

    public get InstallInstructions(): InstructionCollection
    {
        return this.installInstructions;
    }

    public get UpdateInstructions(): UpdateInstructionCollection[]
    {
        return this.updateInstructions;
    }
}