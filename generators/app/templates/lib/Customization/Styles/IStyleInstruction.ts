import IFileSystemInstruction from "../../Automation/IFileSystemInstruction";
import Style from "./Style";

/**
 * Represents an instruction that provides a style.
 */
export default interface IStyleInstruction extends IFileSystemInstruction
{
    /**
     * Gets or sets the style provided by the instruction.
     */
    Style: Style;
}