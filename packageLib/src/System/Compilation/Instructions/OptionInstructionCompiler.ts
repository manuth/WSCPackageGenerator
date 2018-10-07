import { Category } from "../../Options/Category";
import { ICategoryOptions } from "../../Options/ICategoryOptions";
import { IOptionOptions } from "../../Options/IOptionOptions";
import { Option } from "../../Options/Option";
import { OptionInstruction } from "../../PackageSystem/Instructions/Options/OptionInstruction";
import { Compiler } from "../Compiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 */
export abstract class OptionInstructionCompiler<T extends OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>, TCategory extends Category<TOption, TOptionOptions>, TCategoryOptions extends ICategoryOptions<TOptionOptions>, TOption extends Option, TOptionOptions extends IOptionOptions> extends LocalizationProviderCompiler<T>
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