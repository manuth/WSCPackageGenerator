import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Compiler } from "../../Compiler";
import { CronJobFileCompiler } from "../../Tasks/CronJobFileCompiler";
import { TemplateInstructionCompiler } from "./TemplateInstructionCompiler";

/**
 * Provides the functionality to compile cronjob-instructions.
 */
export class CronJobInstructionCompiler extends TemplateInstructionCompiler<CronJobInstruction>
{
    /**
     * Initializes a new instance of the `CronJobInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: CronJobInstruction)
    {
        super(item);
    }

    protected get FileCompiler(): Compiler<CronJobInstruction>
    {
        return new CronJobFileCompiler(this.Item);
    }
}