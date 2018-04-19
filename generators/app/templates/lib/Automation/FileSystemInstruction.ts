import Instruction from "./Instruction";
import FileInstruction from "./FileInstruction";
import { isNull } from "util";

/**
 * Represents an instruction that is bound to the file-system.
 */
export default class FileSystemInstruction extends FileInstruction
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

        if (!isNull(options.SourceRoot))
        {
            this.sourceRoot = options.SourceRoot;
        }

        if (isNull(options.FileName))
        {
            this.FileName = options.SourceRoot + ".tar";
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