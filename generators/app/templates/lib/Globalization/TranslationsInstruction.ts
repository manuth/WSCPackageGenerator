import Instruction from "../Automation/Instruction";
import TranslationNode from "./TranslationNode";
import FileInstruction from "../Automation/FileInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides `Translation`s.
 */
export default class TranslationsInstruction extends FileInstruction
{
    /**
     * The nodes which contains the translations provided by this instruction.
     */
    private translationNodes: TranslationNode[] = [];

    /**
     * Initializes a new instance of the `TranslationsInstruction` class.
     */
    public constructor(options: Partial<TranslationsInstruction> = { })
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "language";
        }

        if (!isNullOrUndefined(options.TranslationNodes))
        {
            this.translationNodes.push(...options.TranslationNodes);
        }
    }

    /**
     * Gets the nodes which contains the translations provided by this instruction.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        return this.translationNodes;
    }
}