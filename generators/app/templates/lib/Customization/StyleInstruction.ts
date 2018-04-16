import FileSystemInstruction from "../Automation/FileSystemInstruction";
import Style from "./Style";

/**
 * Represents an instruction that provides a style.
 */
export default class StyleInstruction extends FileSystemInstruction
{
    /**
     * The style provided by the instruction.
     */
    private style: Style;

    /**
     * Initializes a new instance of the `StyleInstruction` class.
     */
    public constructor(options: Partial<StyleInstruction> = { })
    {
        super(options);
    }

    /**
     * Gets or sets the style provided by the instruction.
     */
    public get Style(): Style
    {
        return this.style;
    }
}