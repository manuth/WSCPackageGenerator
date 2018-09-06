import { Compiler } from "../../Core/Compilation/Compiler";
import { Instruction } from "./Instruction";

/**
 * Provides the functionality to compile `Instruction`s.
 */
export class InstructionCompiler<T extends Instruction> extends Compiler<T>
{
    /**
     * Gets the path of the template to copy to the package.
     */
    protected get TemplatePath(): string
    {
        return this.MakeTemplatePath(this.Item.TemplatePath);
    }

    protected Compile()
    {
        this.FileSystem.copyTpl(this.TemplatePath, this.Item.DestinationPath, { Instruction: this.Item });
    }
}