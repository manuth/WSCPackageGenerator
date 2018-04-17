import InstructionCollection from "./InstructionCollection";
import Package from "../Package";

export default class UpdateInstructionCollection extends InstructionCollection
{
    /**
     * The version of the package this `UpdateInstructionCollection` can be executed on.
     */
    private fromVersion: string;

    /**
     * Initializes a new instance of the `UpdateInstructionCollection`.
     */
    public constructor(options: Partial<UpdateInstructionCollection>)
    {
        super(options.Package);
        this.fromVersion = options.FromVersion;
    }

    /**
     * Gets or sets the version of the package this `UpdateInstructionCollection` can be executed on.
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