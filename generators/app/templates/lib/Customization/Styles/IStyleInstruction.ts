import IFileSystemInstruction from "../../Automation/IFileSystemInstruction";
import IStyleInstructionOptions from "./IStyleInstructionOptions";

/**
 * Represents an instruction that provides a style.
 */
export default interface IStyleInstruction extends IFileSystemInstruction, Required<IStyleInstructionOptions>
{

}