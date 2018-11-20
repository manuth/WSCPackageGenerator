import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { BBCodeFileCompiler } from "../../Presentation/BBCodeFileCompiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile bb-code instructions.
 */
export class BBCodeInstructionCompiler extends LocalizationProviderCompiler<BBCodeInstruction>
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
        await super.Compile();
        let bbCodeFileCompiler: BBCodeFileCompiler = new BBCodeFileCompiler(this.Item);
        bbCodeFileCompiler.DestinationPath = this.DestinationFileName;
        await bbCodeFileCompiler.Execute();
    }
}