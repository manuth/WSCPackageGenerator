import { IFileSystemInstruction } from "../../Automation/IFileSystemInstruction";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions";

/**
 * Represents an instruction that provides a theme.
 */
export interface IThemeInstruction extends IFileSystemInstruction, Required<IThemeInstructionOptions>
{
}