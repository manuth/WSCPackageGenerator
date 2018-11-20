import { ICategory } from "../../../Options/Generic/ICategory";
import { Option } from "../../../Options/Option";
import { IOptionInstruction } from "../../../PackageSystem/Instructions/Options/IOptionInstruction";
import { Compiler } from "../../Compiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 */
export abstract class OptionInstructionCompiler<T extends IOptionInstruction<TCategory, TOption>, TCategory extends ICategory<TOption>, TOption extends Option> extends LocalizationProviderCompiler<T>
{
    /**
     * Initializes a new instance of the `OptionInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets a component for compiling the option-file.
     */
    protected abstract get OptionFileCompiler(): Compiler<T>;

    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: Compiler<T> = this.OptionFileCompiler;
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
        await this.CopyTemplate(this.DestinationFileName, this.DestinationFileName);
    }
}