import FilesInstruction from "../../FilesInstruction";
import IFilesInstruction from "../../IFilesInstruction";

/**
 * Represents an instruction which provides a set of acp-templates.
 */
export default class ACPTemplatesInstruction extends FilesInstruction
{
    /**
     * Initializes a new instance of the `TemplatesInstruction` class.
     */
    public constructor(options: IFilesInstruction)
    {
        super(options);
    }
}