import { isNullOrUndefined } from "util";
import { IFileInstruction } from "./IFileInstruction";
import { IFileInstructionOptions } from "./IFileInstructionOptions";
import { Instruction } from "./Instruction";

/**
 * Represents an instruction that is bound to a file.
 */
export class FileInstruction extends Instruction implements IFileInstruction
{
    /**
     * The filename of the output of the instruction.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the `FileInstruction` class.
     */
    public constructor(options: IFileInstructionOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.FileName))
        {
            this.fileName = options.FileName;
        }
    }

    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value.replace("\\", "/");
    }
}