import Instruction from "../Automation/Instruction";
import SettingsNode from "./SettingsNode";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction that provides options for the control-panel.
 */
export default class OptionsInstruction extends Instruction
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
}