import * as WSCPackage from "../Package";
import PackageCompiler from "./PackageSystem/PackageCompiler";

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
     * The style-path.
     */
    private static stylesPath: string = "styles";

    /**
     * The components-path.
     */
    private static componentsPath: string = "components";
    
    /**
     * The main entry-point of the script.
     * 
     * @param args The arguments passed to the script.
     */
    public static async Main(args: string[])
    {
        await new PackageCompiler(WSCPackage, this.tempPath, this.destinationPath, this.stylesPath, this.componentsPath).Execute();
    }
}

Program.Main(process.argv);