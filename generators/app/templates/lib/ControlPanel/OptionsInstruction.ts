import * as Path from "path";
import Instruction from "../Automation/Instruction";
import SettingsNode from "./SettingsNode";
import Option from "./Option";
import TranslationNode from "../Globalization/TranslationNode";
import FileInstruction from "../Automation/FileInstruction";
import { isNullOrUndefined, isNull } from "util";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default class OptionsInstruction extends FileInstruction
{
    /**
     * A set of names of options to delete.
     */
    private names: string[] = [];

    /**
     * The categories and options provided by the instruction.
     */
    private settingsNode: SettingsNode = null;

    /**
     * The directory to save the language-files to.
     */
    private translationsDirectory: string;

    /**
     * Initializes a new instance of the `OptionsInstruction` class.
     */
    public constructor(options: Partial<OptionsInstruction> = { })
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = "options.xml";
        }

        if (!isNullOrUndefined(options.ObjectsToDelete))
        {
            this.names.push(...options.ObjectsToDelete);
        }
        
        if (!isNullOrUndefined(options.SettingsNode))
        {
            this.settingsNode = options.SettingsNode;
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

    /**
     * Gets or sets the categories and options provided by the instruction.
     */
    public get SettingsNode(): SettingsNode
    {
        return this.settingsNode;
    }

    public set SettingsNode(value: SettingsNode)
    {
        this.settingsNode = value;
    }

    /**
     * Gets or sets the directory to save the language-files to.
     */
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
        return this.settingsNode.GetOptions();
    }

    /**
     * Gets all categories provided by the instruction.
     */
    public get Categories(): SettingsNode[]
    {
        return this.settingsNode.GetCategories();
    }

    /**
     * Gets the translations provided by the instruction.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        return this.SettingsNode.TranslationNodes;
    }

    /**
     * Gets a set of names of options to delete.
     */
    public get ObjectsToDelete(): string[]
    {
        return this.names;
    }
}