import { UserOptionInstruction } from "../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { UserOptionFileCompiler } from "../Options/UserOptionFileCompiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile `UserOptionInstruction`s.
 */
export class UserOptionInstructionCompiler extends LocalizationProviderCompiler<UserOptionInstruction>
{
    /**
     * Initializes a new instance of the `UserOptionInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: UserOptionInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: UserOptionFileCompiler = new UserOptionFileCompiler(this.Item);
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
    }
}