import { TempDirectory } from "../../FileSystem/TempDirectory";
import { ThemeInstruction } from "../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { ThemeCompiler } from "../Presentation/ThemeCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile themes.
 */
export class ThemeInstructionCompiler extends InstructionCompiler<ThemeInstruction>
{
    /**
     * Initializes a new instance of the `ThemeInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ThemeInstruction)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();
        let themeDir: TempDirectory = new TempDirectory();
        let themeCompiler: ThemeCompiler = new ThemeCompiler(this.Item.Theme);

        themeCompiler.DestinationPath = tempDir.FileName;
        await themeCompiler.Execute();
        await this.CopyTemplate(tempDir.FileName, themeDir.FileName);
        await this.Compress(themeDir.FileName, this.DestinationFileName);
        tempDir.Dispose();
        themeDir.Dispose();
    }
}