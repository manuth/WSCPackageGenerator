import { Package } from "../Packaging/Package";
import { IInstructionOptions } from "./IInstructionOptions";

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