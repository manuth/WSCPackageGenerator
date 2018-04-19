import Instruction from "../Automation/Instruction";
import Emoji from "./Emoji";
import FileInstruction from "../Automation/FileInstruction";
import { isNull } from "util";

/**
 * Represents an instruction that provides emojizz.
 */
export default class EmojisInstruction extends FileInstruction
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

        if (isNull(options.FileName))
        {
            this.FileName = "emojis.xml";
        }

        if (!isNull(options.Emojis))
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