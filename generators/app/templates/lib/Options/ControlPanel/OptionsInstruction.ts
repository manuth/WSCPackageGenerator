import * as Path from "path";
import FileInstruction from "../../Automation/FileInstruction";
import Instruction from "../../Automation/Instruction";
import IOptionsInstruction from "./IOptionsInstruction";
import ITranslationsInstruction from "../../Globalization/ITranslationsInstruction";
import Option from "./Option";
import SettingsNode from "./SettingsNode";
import TranslationNode from "../../Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default class OptionsInstruction extends FileInstruction implements IOptionsInstruction, ITranslationsInstruction
{
    /**
     * A set of names of options to delete.
     */
    private objectsToDelete: string[] = [];

    /**
     * The categories and options provided by the instruction.
     */
    private settingsNodes: SettingsNode[] = [];

    /**
     * The directory to save the language-files to.
     */
    private translationsDirectory: string;

    /**
     * Initializes a new instance of the `OptionsInstruction` class.
     */
    public constructor(options: IOptionsInstruction)
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "options.xml";
        }

        if (!isNullOrUndefined(options.ObjectsToDelete))
        {
            this.objectsToDelete.push(...options.ObjectsToDelete);
        }
        
        if (!isNullOrUndefined(options.SettingsNodes))
        {
            this.settingsNodes.push(...options.SettingsNodes);
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

    public get SettingsNodes(): SettingsNode[]
    {
        return this.settingsNodes;
    }

    public get TranslationsDirectory(): string
    {
        return this.translationsDirectory;
    }

    public set TranslationsDirectory(value: string)
    {
        this.translationsDirectory = value;
    }

    /**
     * Gets all options provided by the instruction.
     */
    public get Options(): { [id: string]: Option }
    {
        let result: { [id: string]: Option } = { };

        for (let settingsNode of (this.settingsNodes))
        {
            Object.assign(result, settingsNode.GetOptions());
        }

        return result;
    }

    /**
     * Gets all categories provided by the instruction.
     */
    public get Categories(): SettingsNode[]
    {
        let result: SettingsNode[] = [];

        for (let settingsNode of this.SettingsNodes)
        {
            result.push(...settingsNode.GetCategories());
        }

        return result;
    }

    /**
     * Gets the translations provided by the instruction.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        let result: TranslationNode[] = [];

        for (let settingsNode of this.SettingsNodes)
        {
            for (let translationNode of settingsNode.TranslationNodes)
            {
                let i = result.findIndex((node: TranslationNode) => {
                    return node.FullName === translationNode.FullName;
                });

                if (i >= 0)
                {
                    result[i].Nodes.push(...translationNode.Nodes);
                }
                else
                {
                    result.push(translationNode);
                }
            }
        }

        return result;
    }

    public get ObjectsToDelete(): string[]
    {
        return this.objectsToDelete;
    }
}