import ConflictingPackageDescriptor from "./ConflictingPackageDescriptor";
import FileSystemInstruction from "../Automation/FileSystemInstruction";
import IComponent from "./IComponent";
import Instruction from "../Automation/Instruction";
import IUpdateInstructionCollection from "../Automation/IUpdateInstructionCollection";
import OptionalPackageDescriptor from "./OptionalPackageDescriptor";
import RequiredPackageDescriptor from "./RequiredPackageDescriptor";

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
    UpdateInstructions?: IUpdateInstructionCollection<Instruction>[];

    /**
     * Gets additional files which are copied to the package.
     */
    AdditionalFiles?: FileSystemInstruction[];

    /**
     * Gets the packages which are required for installing this package.
     */
    RequiredPackages?: RequiredPackageDescriptor[];

    /**
     * Gets the optional packages provided by this package.
     */
    OptionalPackages?: OptionalPackageDescriptor[];

    /**
     * Gets the packages which are conflicting with this package.
     */
    ConflictingPackages?: ConflictingPackageDescriptor[];
}