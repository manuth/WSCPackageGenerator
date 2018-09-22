import { Emoji } from "../../../Customization/Presentation/Emoji";
import { Instruction } from "../Instruction";
import { IEmojiInstructionOptions } from "./IEmojiInstructionOptions";

/**
 * Represents an instruction which provides emojis.
 */
export class EmojiInstruction extends Instruction
{
    /**
     * The emojis provided by the instruction.
     */
    private emojis: Emoji[];

    /**
     * Initializes a new instance of the `EmojiInstruction` class.
     */
    public constructor(options: IEmojiInstructionOptions)
    {
        super(options);

        for (let emoji of options.Emojis)
        {
            this.Emojis.push(new Emoji(emoji));
        }
    }

    public get Type(): string
    {
        return "smiley";
    }

    /**
     * Gets the emojis provided by the instruction.
     */
    public get Emojis(): Emoji[]
    {
        return this.emojis;
    }
}