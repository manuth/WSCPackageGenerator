import { IFileSystemInstruction } from "../Automation/IFileSystemInstruction";
import { IFilesInstructionOptions } from "./IFilesInstructionOptions";

/**
 * Represents an instruction which provides a set of files.
 */
export interface IFilesInstruction extends IFileSystemInstruction, Required<IFilesInstructionOptions>
{
}