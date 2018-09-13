import { IInstructionOptions } from "./IInstructionOptions";
import { InstructionSet } from "./InstructionSet";
import * as Path from "path";
import { isNullOrUndefined } from "util";

/**
 * Represents a step of a package-installation.
 */
export abstract class Instruction
{
    /**
     * The package this instruction belongs to.
     */
    private collection: InstructionSet = null;

    /**
     * The name of the file to save the compiled instruction to.
     */
    private fileName: string = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: IInstructionOptions)
    {
        if (!isNullOrUndefined(options.FileName))
        {
            this.FileName = options.FileName;
        }
    }

    /**
     * Gets the name of the type of the instruction.
     */
    public abstract get Type(): string;

    /**
     * Gets or sets the package this instruction belongs to.
     */
    public get Collection()
    {
        return this.collection;
    }

    public set Collection(value)
    {
        this.collection = value;
    }

    /**
     * Gets the directory to save the instruction to.
     */
    public get DestinationRoot(): string
    {
        return Path.join(this.Collection.Directory);
    }

    /**
     * Gets or sets the name of the file to save the compiled instruction to.
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