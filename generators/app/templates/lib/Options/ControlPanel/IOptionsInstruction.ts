import IDeleteInstruction from "../../Automation/IDeleteInstruction";
import IFileInstruction from "../../Automation/IFileInstruction";
import SettingsNode from "./SettingsNode";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default interface IOptionsInstruction extends IFileInstruction, IDeleteInstruction
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