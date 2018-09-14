import { PackageCompiler } from "./Packaging/PackageCompiler";

/**
 * Represents the main entry-point of the script.
 */
class Program
{
    /**
     * The destination-path.
     */
    private static destinationPath: string = "bin";

    /**
     * The temp-path.
     */
    private static tempPath: string = "obj";

    /**
     * The theme-path.
     */
    private static themesPath: string = "themes";

    /**
     * The components-path.
     */
    private static componentsPath: string = "components";

    /**
     * The main entry-point of the script.
     *
     * @param args The arguments passed to the script.
     */
    public static async Main(args: string[]): Promise<void>
    {
        await new PackageCompiler(require("../Package"), this.tempPath, this.destinationPath, this.themesPath, this.componentsPath).Execute();
    }
}

Program.Main(process.argv);