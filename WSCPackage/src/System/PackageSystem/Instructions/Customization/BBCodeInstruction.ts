import { isNullOrUndefined } from "util";
import { BBCodeInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { BBCode } from "../../../Customization/BBCodes/BBCode";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../Globalization/TranslationInstruction";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction";
import { IBBCodeInstructionOptions } from "./IBBCodeInstructionOptions";

/**
 * Represents an instruction which provides bb-codes.
 */
export class BBCodeInstruction extends NamedDeleteInstruction implements ILocalizationInstruction
{
    /**
     * The bb-codes provided by this instruction.
     */
    private bbCodes: BBCode[] = [];

    /**
     * The path to save the translations to. Gets the path to save the translations to.
     */
    private translationDirectory: string = this.Type;

    /**
     * Initializes a new instance of the `BBCodeInstruction` class.
     */
    public constructor(options: IBBCodeInstructionOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.TranslationDirectory))
        {
            this.TranslationDirectory = options.TranslationDirectory;
        }

        for (let bbCode of options.BBCodes)
        {
            this.BBCodes.push(new BBCode(bbCode));
        }
    }

    public get Type()
    {
        return "bbcode";
    }

    /**
     * Gets the bb-codes provided by this instruction.
     */
    public get BBCodes()
    {
        return this.bbCodes;
    }

    public get TranslationDirectory()
    {
        return this.translationDirectory;
    }

    public set TranslationDirectory(value)
    {
        this.translationDirectory = value;
    }

    public get Compiler()
    {
        return new BBCodeInstructionCompiler(this);
    }

    public GetMessages()
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: this.TranslationDirectory,
                Nodes: []
            });

        let rootNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.editor.button"
            });

        for (let bbCode of this.BBCodes)
        {
            if (Object.keys(bbCode.DisplayName).length > 0)
            {
                rootNode.Nodes.push(
                    new LocalizationNode(
                        {
                            Name: bbCode.Name,
                            Item: {
                                Translations: bbCode.DisplayName.Data
                            }
                        }));
            }
        }

        result.Nodes.push(rootNode);
        return result.GetMessages();
    }
}