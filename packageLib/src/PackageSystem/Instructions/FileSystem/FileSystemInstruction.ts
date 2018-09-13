import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";
import { Instruction } from "../Instruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction which is bound to a file-system entry.
 */
export abstract class FileSystemInstruction extends Instruction
{
    /**
     * The path to the file-system entry the instruction is bound to.
     */
    private source: string;

    /**
     * Initializes a new instance of the `FileSystemInstruction` class.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super(options);

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = options.Source;
        }
    }

    /**
     * Gets or sets the path to the file-system entry the instruction is bound to.
     */
    public get Source(): string
    {
        return this.source;
    }

    public set Source(value: string)
    {
        this.source = value;
    }
}