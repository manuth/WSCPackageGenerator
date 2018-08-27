import { Compiler } from "../../Core/Compilation/Compiler";
import { Instruction } from "./Instruction";

/**
 * Provides the functionality to compile `Instruction`s.
 */
export class InstructionCompiler extends Compiler<Instruction>
{
    protected Compile()
    {
        this.FileSystem.copyTpl(this.Item.TemplatePath, this.Item.DestinationPath, { Instruction: this.Item });
    }
}