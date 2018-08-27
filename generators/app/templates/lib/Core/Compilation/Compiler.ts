import * as ChildProcess from "child_process";
import * as FileSystem from "fs-extra";
import { ICompilable } from "./ICompilable";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import * as Temp from "tmp";
import { isNullOrUndefined } from "util";

/**
 * Provides the functionality to compile a component.
 */
export abstract class Compiler<T extends ICompilable>
{
    /**
     * The item to compile.
     */
    private item: T;

    /**
     * The path to save temporary files to.
     */
    private tempPath: Temp.SynchrounousResult = null;

    /**
     * The filesystem-editor for generating the output of the compiler.
     */
    private fileSystem: memFsEditor.memFsEditor.Editor = memFsEditor.create(memFs.create());

    /**
     * Initializes a new instance of the `Compiler` class.
     * 
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        this.item = item;
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
        return this.Item.DestinationPath;
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
     * Gets the filesystem-editor for generating the output of the compiler.
     */
    public get FileSystem()
    {
        return this.fileSystem;
    }

    /**
     * Compiles the item.
     */
    public async Execute()
    {
        await this.Compile();

        await new Promise(done =>
        {
            this.FileSystem.commit(() =>
            {
                done();
            });
        });

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
        return Path.join(this.DestinationPath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by the template-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeTemplatePath(...path: string[]): string
    {
        return Path.join(__dirname, "..", "..", "templates", ...path);
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