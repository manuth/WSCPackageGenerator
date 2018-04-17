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
     * The categories and options provided by the instruction.
     */
    private settingsNode: SettingsNode;

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

        if (!isNullOrUndefined(options.SettingsNode))
        {
            this.settingsNode = options.SettingsNode;
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
}