import { IEmojiOptions } from "../../../Customization/Presentation/IEmojiOptions";
import { IInstructionOptions } from "../IInstructionOptions";

/**
 * Provides options for the `EmojiInstruction` class.
 */
export interface IEmojiInstructionOptions extends IInstructionOptions
{
    /**
     * The emojis provided by the instruction.
     */
    Emojis: IEmojiOptions[];
}