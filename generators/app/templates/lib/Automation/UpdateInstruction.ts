import Instruction from "./Instruction";
import InstructionConfig from "./InstructionConfig";

export default class UpdateInstruction extends Instruction
{
    /**
     * The version this update can be applied to.
     */
    private fromVersion: string = '';

    /**
     * Initializes a new instance of the `UpdateInstructions` class.
     */
    public constructor(options: Partial<InstructionConfig> & { FromVersion: string })
    {
        super(options);
        this.fromVersion = options.FromVersion;
    }

    /**
     * Gets or sets the version this update can be applied to.
     */
    public get FromVersion(): string
    {
        return this.fromVersion;
    }

    public set FromVersion(value: string)
    {
        this.fromVersion = value;
    }
}