import IFilesInstructionOptions from "./IFilesInstructionOptions";
import IFileSystemInstruction from "../Automation/IFileSystemInstruction";

/**
 * Represents an instruction which provides a set of files.
 */
export default interface IFilesInstruction extends IFileSystemInstruction, Required<IFilesInstructionOptions>
{
}