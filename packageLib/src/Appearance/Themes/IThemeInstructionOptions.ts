import { IFileSystemInstructionOptions } from "../../Automation/IFileSystemInstructionOptions";
import { Theme } from "./Theme";

/**
 * Provides options for the `IThemeInstruction` interface.
 */
export interface IThemeInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * Gets or sets the theme provided by the instruction.
     */
    Theme: Theme;
}