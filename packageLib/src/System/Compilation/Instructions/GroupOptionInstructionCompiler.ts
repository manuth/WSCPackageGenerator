import { GroupOptionInstruction } from "../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { GroupOptionFileCompiler } from "../Options/GroupOptionFileCompiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

export class GroupOptionInstructionCompiler extends LocalizationProviderCompiler<GroupOptionInstruction>
{
    /**
     * Initializes a new instance of the `GroupOptionInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: GroupOptionInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: GroupOptionFileCompiler = new GroupOptionFileCompiler(this.Item);
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
    }
}