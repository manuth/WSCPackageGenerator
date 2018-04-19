import * as Path from "path";
import Instruction from "../Automation/Instruction";
import IOptionsInstruction from "./IOptionsInstruction";
import SettingsNode from "./SettingsNode";
import Option from "./Option";
import TranslationNode from "../Globalization/TranslationNode";
import FileInstruction from "../Automation/FileInstruction";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default class OptionsInstruction extends FileInstruction
{
    /**
     * A set of names of options to delete.
     */
    private objectsToDelete: string[] = [];

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

    public get SettingsNode(): SettingsNode
    {
        return this.settingsNode;
    }

    public set SettingsNode(value: SettingsNode)
    {
        this.settingsNode = value;
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

    public get ObjectsToDelete(): string[]
    {
        return this.objectsToDelete;
    }
}