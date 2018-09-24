import { SQLInstruction } from "../PackageSystem/Instructions/Data/SQLInstruction";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile an sql-instruction.
 */
export class SQLInstructionCompiler extends InstructionCompiler<SQLInstruction>
{
    protected async Compile(): Promise<void>
    {
        await this.CopyTemplate(this.Item.Source, this.DestinationFileName);
    }
}