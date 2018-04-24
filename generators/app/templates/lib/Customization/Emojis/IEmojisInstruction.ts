import Emoji from "./Emoji";
import IFileInstruction from "../../Automation/IFileInstruction";

/**
 * Represents an instruction that provides emojis.
 */
export default interface IEmojisInstruction extends IFileInstruction
{
    /**
     * Gets the emojis provided by the instruction.
     */
    Emojis: Emoji[];
}