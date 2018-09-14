import { IDeleteInstruction } from "../../Automation/IDeleteInstruction";
import { IFileInstructionOptions } from "../../Automation/IFileInstructionOptions";
import { SettingsNode } from "./SettingsNode";

/**
 * Provides options for the `IOptionsInstruction` interface.
 */
export interface IOptionsInstructionOptions extends IFileInstructionOptions, IDeleteInstruction
{
    /**
     * Gets or sets the categories and options provided by the instruction.
     */
    SettingsNodes: SettingsNode[];

    /**
     * Gets or sets the directory to save the language-files to.
     */
    TranslationsDirectory?: string;
}