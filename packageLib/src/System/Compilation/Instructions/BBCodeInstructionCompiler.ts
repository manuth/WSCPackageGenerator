import { BBCodeInstruction } from "../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { BBCodeFileCompiler } from "../Presentation/BBCodeFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";
import { LocalizationInstructionCompiler } from "./LocalizationInstructionCompiler";

/**
 * Provides the functionality to compile bb-code instructions.
 */
export class BBCodeInstructionCompiler extends InstructionCompiler<BBCodeInstruction>
{
    /**
     * Initializes a new instance of the `BBCodeInstructionCompiler`.
     */
    public constructor(item: BBCodeInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        let bbCodeFileCompiler: BBCodeFileCompiler = new BBCodeFileCompiler(this.Item.BBCodes);
        let localizationInstructionCompiler: LocalizationInstructionCompiler = new LocalizationInstructionCompiler(this.Item);
        bbCodeFileCompiler.DestinationPath = this.DestinationFileName ;
        localizationInstructionCompiler.DestinationPath = this.DestinationPath;
        await bbCodeFileCompiler.Execute();
        await localizationInstructionCompiler.Execute();
    }
}