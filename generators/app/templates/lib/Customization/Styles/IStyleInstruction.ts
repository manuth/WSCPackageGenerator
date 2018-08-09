import IStyleInstructionOptions from "./IStyleInstructionOptions";
import IFileSystemInstruction from "../../Automation/IFileSystemInstruction";

/**
 * Represents an instruction that provides a style.
 */
export default interface IStyleInstruction extends IFileSystemInstruction, Required<IStyleInstructionOptions>
{

}