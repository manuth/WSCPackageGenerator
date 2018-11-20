import { EmojiInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EmojiInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Emoji } from "../../../Customization/Presentation/Emoji";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction";
import { IEmojiInstructionOptions } from "./IEmojiInstructionOptions";

/**
 * Represents an instruction which provides emojis.
 */
export class EmojiInstruction extends NamedDeleteInstruction
{
    /**
     * The emojis provided by the instruction.
     */
    private emojis: Emoji[] = [];

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

    public get Compiler(): InstructionCompiler<EmojiInstruction>
    {
        return new EmojiInstructionCompiler(this);
    }
}