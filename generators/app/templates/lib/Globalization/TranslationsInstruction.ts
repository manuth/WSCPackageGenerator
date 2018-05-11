import FileInstruction from "../Automation/FileInstruction";
import Instruction from "../Automation/Instruction";
import ITranslationsInstruction from "./ITranslationsInstruction";
import TranslationNode from "./TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides `Translation`s.
 */
export default class TranslationsInstruction extends FileInstruction implements ITranslationsInstruction
{
    /**
     * The nodes which contains the translations provided by this instruction.
     */
    private translationNodes: TranslationNode[] = [];

    /**
     * Initializes a new instance of the `TranslationsInstruction` class.
     */
    public constructor(options: ITranslationsInstruction)
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "language";
        }

        this.translationNodes.push(...options.TranslationNodes);
    }

    public get TranslationNodes(): TranslationNode[]
    {
        return this.translationNodes;
    }

    /**
     * Gets all messages provided by this instruction.
     */
    public get Translations(): { [id: string]: TranslationNode }
    {
        let result: { [id: string]: TranslationNode } = { };

        for (let node of this.TranslationNodes)
        {
            Object.assign(result, node.GetMessages());
        }

        return result;
    }
}