import { IFileSystemInstructionOptions } from "../../Automation/IFileSystemInstructionOptions";
import { Style } from "./Style";

/**
 * Provides options for the `IStyleInstruction` interface.
 */
export interface IStyleInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * Gets or sets the style provided by the instruction.
     */
    Style: Style;
}