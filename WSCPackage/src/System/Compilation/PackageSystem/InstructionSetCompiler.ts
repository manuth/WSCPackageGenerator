import { isNullOrUndefined } from "util";
import { IInstruction } from "../../PackageSystem/Instructions/IInstruction";
import { InstructionSet } from "../../PackageSystem/Instructions/InstructionSet";
import { Compiler } from "../Compiler";
import { InstructionCompiler } from "./Instructions/InstructionCompiler";

/**
 * Provides the functionality to compile instruction-sets.
 */
export class InstructionSetCompiler extends Compiler<InstructionSet>
{
    /**
     * Initializes a new instance of the `InstructionSetCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: InstructionSet)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        for (let instruction of this.Item)
        {
            let compiler: InstructionCompiler<IInstruction> = instruction.Compiler;

            if (!isNullOrUndefined(compiler))
            {
                compiler.DestinationPath = this.DestinationPath;
                await compiler.Execute();
            }
        }
    }
}