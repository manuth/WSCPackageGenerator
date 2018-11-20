import * as Path from "path";
import { PackageCompiler } from "./System/Compilation/PackageSystem/PackageCompiler";
import { Package } from "./System/PackageSystem/Package";

/**
 * Represents the main entry-point of the script.
 */
class Program
{
    /**
     * The main entry-point of the script.
     *
     * @param args The arguments passed to the script.
     */
    public static async Main(args: string[]): Promise<void>
    {
        let $package: Package = new Package(require("../Package"));
        let compiler: PackageCompiler = new PackageCompiler($package);
        compiler.DestinationPath = Path.join("bin", `${$package.Name}.tar`);
        await compiler.Execute();
    }
}

Program.Main(process.argv);