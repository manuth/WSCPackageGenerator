import FilesInstruction from "../FilesInstruction";

/**
 * Represents an instruction which provides a set of templates.
 */
export default class TemplatesInstruction extends FilesInstruction
{
    /**
     * Initializes a new instance of the `TemplatesInstruction` class.
     */
    public constructor(options: Partial<TemplatesInstruction> = { })
    {
        super(options);
    }
}