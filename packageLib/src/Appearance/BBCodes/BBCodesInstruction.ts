import * as Path from "path";
import { isNullOrUndefined } from "util";
import { FileInstruction } from "../../Automation/FileInstruction";
import { ITranslationsInstruction } from "../../Globalization/ITranslationsInstruction";
import { TranslationNode } from "../../Globalization/TranslationNode";
import { BBCode } from "./BBCode";
import { IBBCodesInstruction } from "./IBBCodesInstruction";
import { IBBCodesInstructionOptions } from "./IBBCodesInstructionOptions";

/**
 * Represents an instruction that provides bb-codes.
 */
export class BBCodesInstruction extends FileInstruction implements IBBCodesInstruction, ITranslationsInstruction
{
    /**
     * The directory to save the language-files to.
     */
    private translationsDirectory: string;

    /**
     * The bb-codes provided by the instruction.
     */
    private bbcodes: BBCode[] = [];

    /**
     * Initializes a new instance of the `BBCodesInstruction` class.
     */
    public constructor(options: IBBCodesInstructionOptions)
    {
        super(options);

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = "bbcodes.xml";
        }

        if (!isNullOrUndefined(options.BBCodes))
        {
            this.bbcodes.push(...options.BBCodes);
        }

        if (!isNullOrUndefined(options.TranslationsDirectory))
        {
            this.translationsDirectory = options.TranslationsDirectory;
        }
        else
        {
            this.translationsDirectory = Path.basename(this.FileName, Path.extname(this.FileName));
        }
    }

    public get BBCodes(): BBCode[]
    {
        return this.bbcodes;
    }

    public get TranslationsDirectory(): string
    {
        return this.translationsDirectory;
    }

    public set TranslationsDirectory(value: string)
    {
        this.translationsDirectory = value;
    }

    public get TranslationNodes(): TranslationNode[]
    {
        let result: TranslationNode = new TranslationNode({
            Name: "wcf.editor.button"
        });

        for (let bbcode of this.BBCodes)
        {
            if (Object.keys(bbcode.DisplayName).length > 0)
            {
                result.Nodes.push(
                    new TranslationNode({
                        Name: bbcode.Name,
                        Translations: bbcode.DisplayName
                    }));
            }
        }

        return [ result ];
    }
}