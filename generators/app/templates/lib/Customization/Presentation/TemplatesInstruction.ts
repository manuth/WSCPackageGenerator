import FilesInstruction from "../../Core/FilesInstruction";
import IFilesInstruction from "../../Core/IFilesInstruction";

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