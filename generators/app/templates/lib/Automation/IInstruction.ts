import { IInstructionOptions } from "./IInstructionOptions";
import { Package } from "../PackageSystem/Package";

/**
 * Represents an instruction for installing a package.
 */
export interface IInstruction extends Required<IInstructionOptions>
{
    /**
     * Gets or sets the package this instruction belongs to.
     */
    Package: Package;
}