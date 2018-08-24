import { Emoji } from "./Emoji";
import { IFileInstructionOptions } from "../../Automation/IFileInstructionOptions";

/**
 * Provides options for the `IEmojisInstruction` interface.
 */
export interface IEmojisInstructionOptions extends IFileInstructionOptions
{
    /**
     * Gets the emojis provided by the instruction.
     */
    Emojis: Emoji[];
}