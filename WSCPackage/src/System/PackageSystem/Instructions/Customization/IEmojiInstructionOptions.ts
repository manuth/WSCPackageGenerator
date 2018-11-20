import { IEmojiOptions } from "../../../Customization/Presentation/IEmojiOptions";
import { INamedObject } from "../../../INamedObject";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";

/**
 * Provides options for the `EmojiInstruction` class.
 */
export interface IEmojiInstructionOptions extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The emojis provided by the instruction.
     */
    Emojis: IEmojiOptions[];
}