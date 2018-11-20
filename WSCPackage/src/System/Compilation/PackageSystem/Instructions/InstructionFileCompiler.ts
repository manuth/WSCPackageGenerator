import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { Compiler } from "../../Compiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile instructions which only depend on one file-compiler.
 */
export abstract class InstructionFileCompiler<T extends IInstruction> extends InstructionCompiler<T>
{
    /**
     * Initializes a new instance of the `InstructionFileCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets a component for compiling the file.
     */
    protected abstract get FileCompiler(): Compiler<T>;

    protected async Compile(): Promise<void>
    {
        let compiler: Compiler<T> = this.FileCompiler;
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
    }
}