import FilesInstruction from "../../Core/FilesInstruction";
import IFilesInstructionOptions from "../../Core/IFilesInstructionOptions";

/**
 * Represents an instruction which provides a set of templates.
 */
export default class TemplatesInstruction extends FilesInstruction
{
    /**
     * Initializes a new instance of the `TemplatesInstruction` class.
     */
    public constructor(options: IFilesInstructionOptions)
    {
        super(options);
    }
}