import Instruction from "./Instruction";
import { isNull } from "util";

/**
 * Represents an instruction that is bound to a file.
 */
export default class FileInstruction extends Instruction
{
    /**
     * The filename of the ouput of the instruction.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the `FileInstruction` class.
     */
    public constructor(options: Partial<FileInstruction> = { })
    {
        super(options);

        if (isNull(options.FileName))
        {
            this.fileName = options.FileName;
        }
    }

    /**
     * Gets or sets the filename of the ouput of the instruction.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value.replace("\\", "/");
    }
}