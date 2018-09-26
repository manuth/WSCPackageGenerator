import { TempFile } from "../../FileSystem/TempFile";
import { CronJobInstruction } from "../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { CronJobFileCompiler } from "../Tasks/CronJobFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile cronjob-instructions.
 */
export class CronJobInstructionCompiler extends InstructionCompiler<CronJobInstruction>
{
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