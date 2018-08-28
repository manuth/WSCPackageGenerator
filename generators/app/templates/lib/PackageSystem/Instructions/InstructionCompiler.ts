import { Compiler } from "../../Core/Compilation/Compiler";
import { Instruction } from "./Instruction";

/**
 * Provides the functionality to compile `Instruction`s.
 */
export class InstructionCompiler<T extends Instruction> extends Compiler<T>
{
    protected Compile()
    {
        this.FileSystem.copyTpl(this.Item.TemplatePath, this.Item.DestinationPath, { Instruction: this.Item });
    }
}