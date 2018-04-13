import Component from "./Component";
import Instruction from "./Instruction";
import UpdateInstruction from "./UpdateInstruction";
import InstructionCollection from "./Collections/InstructionCollection";
import Option from "./Option";
import SettingsNode from "./SettingsNode";

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
     * The instruction that is used for installing the packge.
     */
    private installInstruction = new Instruction({ Package: this });

    /**
     * A set of instructions for updating the package.
     */
    private updateInstructions: UpdateInstruction[] = new InstructionCollection(this);

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: Partial<Package> = { })
    {
        super(options);

        if (options.Identifier)
        {
            this.identifier = options.Identifier;
        }

        if (options.InstallInstruction)
        {
            this.installInstruction = options.InstallInstruction;
        }

        if (options.UpdateInstructions)
        {
            this.updateInstructions.push(...options.UpdateInstructions);
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
     * Gets or sets the instruction that is used for installing the packge.
     */
    public get InstallInstruction(): Instruction
    {
        return this.installInstruction;
    }

    public set InstallInstruction(value: Instruction)
    {
        this.installInstruction = value;
    }

    /**
     * Gets a set of instructions for updating the package.
     */
    public get UpdateInstructions(): UpdateInstruction[]
    {
        return this.updateInstructions;
    }

    /**
     * Gets the options provided by this package.
     */
    public get Options(): { [id: string]: Option }
    {
        return this.installInstruction.Options;
    }

    /**
     * Gets the categories provided by this package.
     */
    public get Categories(): SettingsNode[]
    {
        return this.installInstruction.Categories;
    }
}