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
        let path = Path;
        MemFileSystem.copyTpl(this.TemplatePath("package.xml"), this.PackagePath("package.xml"), { Package: WSCPackage, StylesPath: this.stylesPath, ComponentsPath: this.componentsPath });

        for (let fileMapping of WSCPackage.InstallInstruction.FileMappings)
        {
            let filesGenerator = memFsEditor.create(memFs.create());
            filesGenerator.copyTpl(fileMapping.SourceRoot, this.PackagePath(fileMapping.SourceRoot), WSCPackage);
            filesGenerator.commit([], () => { });

            await this.Compress(this.PackagePath(fileMapping.SourceRoot), this.PackagePath(fileMapping.SourceRoot + ".tar"));
        }

        if (WSCPackage.Categories.length > 0)
        {
            MemFileSystem.copyTpl(this.TemplatePath("options.xml"), this.ComponentsPath("options.xml"), { Package: WSCPackage });
        }

        if (WSCPackage.InstallInstruction.EventListeners.length > 0)
        {
            MemFileSystem.copyTpl(this.TemplatePath("eventListeners.xml"), this.ComponentsPath("eventListeners.xml"), { Package: WSCPackage })
        }

        MemFileSystem.commit(
            [],
            () =>
            { });
    }

    /**
     * Compresses a folder and saves the result to a specified file.
     * 
     * @param source
     * The folder that is to be compressed.
     * 
     * @param destination
     * The filename to save the compressed file to.
     */
    private static async Compress(source: string, destination: string)
    {
        await ChildProcess.execFile(
            "7z",
            [
                "a",
                "-up0q0",
                Path.resolve(destination),
                "*"
            ],
            {
                cwd: source
            });
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
     * Joins the paths and returns the path inside the styles-folder.
     * 
     * @param path
     * The path inside the styles-folder.
     */
    private static StylesPath(...path: string[]): string
    {
        return Path.join(this.TempPath(this.stylesPath), ...path);
    }

    /**
     * Joins the paths and returns the path inside the styles-folder.
     * 
     * @param path
     * The path inside the styles-folder.
     */
    private static ComponentsPath(...path: string[]): string
    {
        return Path.join(this.PackagePath(this.componentsPath), ...path);
    }
}

Program.Main(process.argv);