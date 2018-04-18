import Instruction from "./Automation/Instruction";
import FileMapping from "./FileMapping";
import FileSystemInstruction from "./Automation/FileSystemInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction which provides a set of files.
 */
export default class FilesInstruction extends FileSystemInstruction
{
    /**
     * The application to provide the files to.
     */
    private application: string = "";

    /**
     * Initializes a new instance of the `FilesInstruction` class.
     */
    public constructor(options: Partial<FilesInstruction> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Application))
        {
            this.application = options.Application;
        }
    }

    /**
     * Gets the application to provide the files to.
     */
    public get Application(): string
    {
        return this.application;
    }
}