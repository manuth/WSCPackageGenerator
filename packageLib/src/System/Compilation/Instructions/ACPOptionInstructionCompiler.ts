import { ACPOptionInstruction } from "../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { ACPOptionFileCompiler } from "../Options/ACPOptionFileCompiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 */
export class ACPOptionInstructionCompiler extends LocalizationProviderCompiler<ACPOptionInstruction>
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

    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: ACPOptionFileCompiler = new ACPOptionFileCompiler(this.Item);
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
    }
}