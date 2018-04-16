import FilesInstruction from "../FilesInstruction";

/**
 * Represents an instruction which provides a set of acp-templates.
 */
export default class ACPTemplatesInstruction extends FilesInstruction
{
    /**
     * Initializes a new instance of the `TemplatesInstruction` class.
     */
    public constructor(options: Partial<ACPTemplatesInstruction> = { })
    {
        super(options);
    }
}