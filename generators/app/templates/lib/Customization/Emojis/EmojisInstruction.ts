import Emoji from "./Emoji";
import FileInstruction from "../../Automation/FileInstruction";
import IEmojisInstructionOptions from "./IEmojisInstructionOptions";
import Instruction from "../../Automation/Instruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides emojis.
 */
export default class EmojisInstruction extends FileInstruction implements IEmojisInstructionOptions
{
    /**
     * The emojis provided by the instruction.
     */
    private emojis: Emoji[] = [];

    /**
     * Initializes a new instance of the `EmojisInstruction` class.
     */
    public constructor(options: IEmojisInstructionOptions)
    {
        super(options);

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = "emojis.xml";
        }

        if (!isNullOrUndefined(options.Emojis))
        {
            this.emojis.push(...options.Emojis);
        }
    }

    public get Emojis(): Emoji[]
    {
        return this.emojis;
    }
}