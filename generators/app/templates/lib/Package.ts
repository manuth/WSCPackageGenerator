import Component from "./Component";
import TranslationNode from "./Globalization/TranslationNode";
import InstructionCollection from "./Automation/InstructionCollection";
import UpdatesCollection from "./Automation/UpdatesCollection";
import Instruction from "./Automation/Instruction";
import UpdateInstructionCollection from "./Automation/UpdateInstructionCollection";
import { isNullOrUndefined } from "util";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default class Package extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string = '';

    /**
     * The instructions which is used for installing the packge.
     */
    private installInstructions: Instruction[] = new InstructionCollection(this);

    /**
     * A set of instructions for updating the package.
     */
    private updateInstructions: UpdateInstructionCollection[] = new UpdatesCollection(this);

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: Partial<Package> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Identifier))
        {
            this.identifier = options.Identifier;
        }

        if (isNullOrUndefined(options.Date))
        {
            this.Date = new Date();
        }

        if (isNullOrUndefined(options.Author))
        {
            this.Author.Name = require("../package.json").author.name;
            this.Author.URL = require("../package.json").author.url;
        }

        if (isNullOrUndefined(options.Version))
        {
            this.Version = require("../package.json").version;
        }

        if (isNullOrUndefined(options.License))
        {
            this.License = require("../package.json").license;
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

                for (let instruction of updateInstruction)
                {
                    updateInstructionCollection.push(instruction);
                }
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
     * Gets or sets the instructions which is used for installing the packge.
     */
    public get InstallInstructions(): Instruction[]
    {
        return this.installInstructions;
    }

    /**
     * Gets a set of instructions for updating the package.
     */
    public get UpdateInstructions(): UpdateInstructionCollection[]
    {
        return this.updateInstructions;
    }
}