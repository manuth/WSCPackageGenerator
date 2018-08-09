import Compiler from "./Compiler";
import IInstruction from "../Automation/IInstruction";

/**
 * Provides the functionality to compile an instruction.
 */
export default abstract class InstructionCompiler<T extends IInstruction> extends Compiler<T>
{
    /**
     * Compiles the instruction.
     */
    protected abstract Compile();
}