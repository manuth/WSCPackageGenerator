import Emoji from "./Emoji";
import IFileInstructionOptions from "../../Automation/IFileInstructionOptions";

/**
 * Provides options for the `IEmojisInstruction` interface.
 */
export default interface IEmojisInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets the emojis provided by the instruction.
     */
    Emojis: Emoji[];
}