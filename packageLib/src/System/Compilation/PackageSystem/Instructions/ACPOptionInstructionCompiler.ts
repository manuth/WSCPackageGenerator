import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { ACPOption } from "../../../Options/ControlPanel/ACPOption";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { ACPOptionFileCompiler } from "../../Options/ACPOptionFileCompiler";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 */
export class ACPOptionInstructionCompiler extends OptionInstructionCompiler<ACPOptionInstruction, ACPCategory, ACPOption>
{
    /**
     * Initializes a new instance of the `ACPOptionInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ACPOptionInstruction)
    {
        super(item);
    }

    protected get OptionFileCompiler(): ACPOptionFileCompiler
    {
        return new ACPOptionFileCompiler(this.Item);
    }
}