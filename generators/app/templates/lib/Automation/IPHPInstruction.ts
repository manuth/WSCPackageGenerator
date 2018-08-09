import IFileInstruction from "./IFileInstruction";
import IPHPInstructionOptions from "./IPHPInstructionOptions";

/**
 * Represents an instruction which provides a php-script execute when invoking the instruction.
 * Please keep in mind to provide the file using a FilesInstruction.
 */
export default interface IPHPInstruction extends IFileInstruction, Required<IPHPInstructionOptions>
{
}