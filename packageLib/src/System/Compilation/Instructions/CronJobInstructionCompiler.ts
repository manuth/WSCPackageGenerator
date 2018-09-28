import { TempFile } from "../../FileSystem/TempFile";
import { CronJobInstruction } from "../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { CronJobFileCompiler } from "../Tasks/CronJobFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile cronjob-instructions.
 */
export class CronJobInstructionCompiler extends InstructionCompiler<CronJobInstruction>
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

    protected async Compile(): Promise<void>
    {
        let tempFile: TempFile = new TempFile();
        {
            let compiler: CronJobFileCompiler = new CronJobFileCompiler(this.Item);
            compiler.DestinationPath = tempFile.FileName;
            await compiler.Execute();
            await this.CopyTemplate(tempFile.FileName, this.DestinationFileName);
        }
    }
}