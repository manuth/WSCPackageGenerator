import Instruction from "./Instruction";
import FileInstruction from "./FileInstruction";
import { isNullOrUndefined } from "util";
import IFileInstruction from "./IFileInstruction";
import IFileSystemInstruction from "./IFileSystemInstruction";

/**
 * Represents an instruction that is bound to the file-system.
 */
export default class FileSystemInstruction extends FileInstruction implements IFileSystemInstruction
{
    /**
     * The root-path of the filesystem-entry that belongs to the instruction.
     */
    private sourceRoot: string;

    /**
     * Initializes a new instance of the `FileSystemInstruction` class.
     */
    public constructor(options: IFileSystemInstruction)
    {
        super(options);
        this.sourceRoot = options.SourceRoot;
        
        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = options.SourceRoot;
        }
    }

    public get SourceRoot(): string
    {
        return this.sourceRoot;
    }

    public set SourceRoot(value: string)
    {
        this.sourceRoot = value;
    }
}