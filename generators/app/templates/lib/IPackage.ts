import IComponent from "./IComponent";
import Instruction from "./Automation/Instruction";
import IUpdateInstructionCollection from "./Automation/IUpdateInstructionCollection";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default interface IPackage extends IComponent
{
    /**
     * Gets or sets the identifier of the package.
     */
    Identifier: string;
    
    /**
     * Gets or sets the instructions which is used for installing the packge.
     */
    InstallInstructions: Instruction[];
    
    /**
     * Gets a set of instructions for updating the package.
     */
    UpdateInstructions?: IUpdateInstructionCollection[];
}