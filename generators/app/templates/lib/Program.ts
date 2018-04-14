import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Path from "path";
import * as memFsEditor from "mem-fs-editor";
import * as memFs from "mem-fs";

const MemFileSystem = memFsEditor.create(memFs.create());
import * as WSCPackage from "../Package";

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
     * The main entry-point of the script.
     * 
     * @param args The arguments passed to the script.
     */
    public static Main(args: string[])
    {
        MemFileSystem.copyTpl(this.TemplatePath("package.xml"), this.PackagePath("package.xml"), { Package: WSCPackage, StylesPath: this.stylesPath, ComponentsPath: this.componentsPath });
        MemFileSystem.commit(
            [],
            () =>
            { });
    }

    /**
     * Joins the paths and returns the path inside the template-folder.
     * 
     * @param path
     * The path inside the template-folder.
     */
    private static TemplatePath(...path: string[]): string
    {
        return Path.join(__dirname, "templates", ...path);
    }

    /**
     * Joins the paths and returns the path inside the destination-folder.
     * 
     * @param path
     * The path inside the destination-folder.
     */
    private static DestinationPath(...path: string[]): string
    {
        return Path.join(this.destinationPath, ...path);
    }

    /**
     * Joins the paths and returns the path inside the temp-folder.
     * 
     * @param path
     * The path inside the temp-folder.
     */
    private static TempPath(...path: string[]): string
    {
        return Path.join(this.tempPath, ...path);
    }

    /**
     * Joins the paths and returns the path inside the package-folder.
     * 
     * @param path
     * The path inside the package-folder.
     */
    private static PackagePath(...path: string[]): string
    {
        return Path.join(this.TempPath("package"), ...path);
    }

    /**
     * 
     * Joins the paths and returns the path inside the style-folder.
     * 
     * @param path
     * The path inside the style-folder.
     */
    private static StylePath(...path: string[]): string
    {
        return Path.join(this.TempPath(this.stylePath), ...path);
    }
}

Program.Main(process.argv);