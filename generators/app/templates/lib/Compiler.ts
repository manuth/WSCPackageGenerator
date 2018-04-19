import * as ChildProcess from "child_process";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as Temp from "tmp";
import { isNullOrUndefined } from "util";

/**
 * Provides the functionality to compile parts of the package.
 */
export default abstract class Compiler<T>
{
    /**
     * The item to compile.
     */
    private item: T;

    /**
     * The path to save the compiled item to.
     */
    private destinationPath: string;

    /**
     * The path to save temporary files to.
     */
    private tempPath: Temp.SynchrounousResult = null;

    /**
     * Initializes a new instance of the `Compiler` class.
     * 
     * @param item
     * The item to compile.
     * 
     * @param destinationPath
     * The path to save the compiled item to.
     */
    public constructor(item: T, destinationPath)
    {
        this.item = item;
        this.destinationPath = destinationPath;
    }

    /**
     * Gets the item to compile.
     */
    public get Item(): T
    {
        return this.item;
    }

    /**
     * Gets the path to save the compiled item to.
     */
    public get DestinationPath(): string
    {
        return this.destinationPath;
    }

    /**
     * Gets the path to save temporary files to.
     */
    public get TempPath(): string
    {
        if (isNullOrUndefined(this.tempPath))
        {
            this.tempPath = Temp.dirSync();
        }

        return this.tempPath.name;
    }

    /**
     * Compiles the item.
     */
    public async Execute()
    {
        await this.Compile();

        if (this.tempPath)
        {
            await FileSystem.emptyDir(this.tempPath.name);
            this.tempPath.removeCallback();
        }
    }

    /**
     * Compiles the item.
     */
    protected abstract async Compile();
    
    /**
     * Joins the paths and returns the path contained by the destination-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeDestinationPath(...path: string[]): string
    {
        return Path.join(this.destinationPath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by the template-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeTemplatePath(...path: string[]): string
    {
        return Path.join(__dirname, "templates", ...path);
    }

    /**
     * Joins the paths and returns the path contained by a temporary folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeTempPath(...path: string[]): string
    {
        return Path.join(this.TempPath, ...path);
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
    protected Compress(source: string, destination: string)
    {
        ChildProcess.execFileSync(
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
}