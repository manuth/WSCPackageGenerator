import Instruction from "./Instruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that is bound to the file-system.
 */
export default class FileSystemInstruction extends Instruction
{
    /**
     * The root-path of the filesystem-entry that belongs to the instruction.
     */
    private sourceRoot: string;

    /**
     * Initializes a new instance of the `FileSystemInstruction` class.
     */
    public constructor(options: Partial<FileSystemInstruction> = { })
    {
        super(options);

        if (isNullOrUndefined(options.SourceRoot))
        {
            this.sourceRoot = options.SourceRoot;
        }
    }

    /**
     * Gets or sets the root-path of the filesystem-entry that belongs to the instruction.
     */
    public get SourceRoot(): string
    {
        return this.sourceRoot;
    }

    public set SourceRoot(value: string)
    {
        this.sourceRoot = value;
    }
}