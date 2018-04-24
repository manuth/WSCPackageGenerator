import FilesInstruction from "../../FilesInstruction";
import IFilesInstruction from "../../IFilesInstruction";

/**
 * Represents an instruction which provides a set of templates.
 */
export default class TemplatesInstruction extends FilesInstruction
{
    /**
     * Initializes a new instance of the `TemplatesInstruction` class.
     */
    public constructor(options: IFilesInstruction)
    {
        super(options);
    }
}