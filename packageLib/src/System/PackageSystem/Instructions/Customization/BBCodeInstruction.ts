import { BBCode } from "../../../Customization/BBCodes/BBCode";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { ITranslationProviderInstruction } from "../Globalization/ITranslationProviderInstruction";
import { TranslationInstruction } from "../Globalization/TranslationInstruction";
import { Instruction } from "../Instruction";

/**
 * Represents an instruction which provides bbcodes.
 */
export class BBCodeInstruction extends Instruction implements ITranslationProviderInstruction
{
    /**
     * The bbcodes provided by this instruction.
     */
    private bbCodes: BBCode[];

    /**
     * The path to save the translations to. Gets the path to save the translations to.
     */
    private translationDirectory: string = this.Type;

    public get Type(): string
    {
        return "bbcode";
    }

    /**
     * Gets the bbcodes provided by this instruction.
     */
    public get BBCodes(): BBCode[]
    {
        return this.bbCodes;
    }

    public get TranslationDirectory(): string
    {
        return this.translationDirectory;
    }

    public set TranslationDirectory(value: string)
    {
        this.translationDirectory = value;
    }

    public get Translations(): ILocalizationInstruction
    {
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
                                Translations: bbCode.DisplayName
                            }
                        }));
            }
        }

        return new TranslationInstruction(
            {
                FileName: this.TranslationDirectory,
                Nodes: [
                    rootNode
                ]
            });
    }
}