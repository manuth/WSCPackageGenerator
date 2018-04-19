import IFileInstruction from "./IFileInstruction";
import Instruction from "./Instruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that is bound to a file.
 */
export default class FileInstruction extends Instruction implements IFileInstruction
{
    /**
     * The filename of the ouput of the instruction.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the `FileInstruction` class.
     */
    public constructor(options: IFileInstruction)
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