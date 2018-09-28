import { SQLInstruction } from "../../PackageSystem/Instructions/Data/SQLInstruction";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile an sql-instruction.
 */
export class SQLInstructionCompiler extends InstructionCompiler<SQLInstruction>
{
    /**
     * Initializes a new instance of the `SQLInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: SQLInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        await this.CopyTemplate(this.Item.Source, this.DestinationFileName);
    }
}