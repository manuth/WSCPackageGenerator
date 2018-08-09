import FileSystemInstruction from "../Automation/FileSystemInstruction";
import IFilesInstructionOptions from "./IFilesInstructionOptions";
import { isNullOrUndefined } from "util";
import IFilesInstruction from "./IFilesInstruction";

/**
 * Represents an instruction which provides a set of files.
 */
export default class FilesInstruction extends FileSystemInstruction implements IFilesInstruction
{
    /**
     * The application to provide the files to.
     */
    private application: string = "";

    /**
     * Initializes a new instance of the `FilesInstruction` class.
     */
    public constructor(options: IFilesInstructionOptions)
    {
        super(options);
        
        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = options.SourceRoot + ".tar";
        }

        if (!isNullOrUndefined(options.Application))
        {
            this.application = options.Application;
        }
    }

    public get Application(): string
    {
        return this.application;
    }
}