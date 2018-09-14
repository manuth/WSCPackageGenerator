import { IInstruction } from "../Automation/IInstruction";
import { Compiler } from "./Compiler";

/**
 * Provides the functionality to compile an instruction.
 */
export abstract class InstructionCompiler<T extends IInstruction> extends Compiler<T>
{
    /**
     * Compiles the instruction.
     */
    protected abstract Compile(): Promise<void>;
}