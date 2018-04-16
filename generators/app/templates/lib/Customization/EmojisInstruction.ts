import Instruction from "../Automation/Instruction";
import Emoji from "./Emoji";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides emojizz.
 */
export default class EmojisInstruction extends Instruction
{
    /**
     * The emojis provided by the instruction.
     */
    private emojis: Emoji[] = [];

    /**
     * Initializes a new instance of the `EmojisInstruction` class.
     */
    public constructor(options: Partial<EmojisInstruction> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Emojis))
        {
            this.emojis.push(...options.Emojis);
        }
    }

    /**
     * Gets the emojis provided by the instruction.
     */
    public get Emojis(): Emoji[]
    {
        return this.emojis;
    }
}