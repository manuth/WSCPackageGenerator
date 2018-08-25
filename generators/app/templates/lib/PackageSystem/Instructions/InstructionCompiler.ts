import { Compiler } from "../../Core/Compilation/Compiler";
import { Instruction } from "./Instruction";

/**
 * Provides the functionality to compile `Instruction`s.
 */
export class InstructionCompiler extends Compiler<Instruction>
{
    protected Compile()
    {
        throw new Error("Method not implemented.");
    }
}