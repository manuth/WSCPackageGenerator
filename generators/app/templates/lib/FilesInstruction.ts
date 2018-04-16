import Instruction from "./Automation/Instruction";
import FileMapping from "./FileMapping";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction which provides a set of files.
 */
export default class FilesInstruction extends Instruction
{
    /**
     * The file-mappings of the files provided by the instruction.
     */
    private fileMappings: FileMapping[] = [];

    /**
     * Initializes a new instance of the `FilesInstruction` class.
     */
    public constructor(options: Partial<FilesInstruction> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.FileMappings))
        {
            this.fileMappings.push(...options.FileMappings);
        }
    }

    /**
     * Gets the file-mappings of the files provided by the instruction.
     */
    public get FileMappings(): FileMapping[]
    {
        return this.fileMappings;
    }
}