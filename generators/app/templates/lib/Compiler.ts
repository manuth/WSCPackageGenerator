import * as ChildProcess from "child_process";
import * as EJS from "ejs";
import * as FileSystem from "fs-extra";
import IsBinaryFile = require("isbinaryfile");
import * as Path from "path";
import * as Temp from "tmp";
import { isNullOrUndefined } from "util";
import { memFsEditor } from "mem-fs-editor";

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

    /**
     * Provides a quick and dirty fix for `mem-fs-editor` which doesn't support copying binary files yet.
     * 
     * @param editor
     * The `mem-fs-editor` to perform the action.
     * 
     * @param from
     * The source-file/directory/glob-pattern.
     * 
     * @param to 
     * The destination-file/directory/glob-pattern.
     * 
     * @param context
     * The context to use when transforming files using `ejs`.
     * 
     * @param tplSettings
     * The settings to use when transforming file using `ejs`.
     */
    protected CopyTplFix(editor: memFsEditor.Editor, from: any, to: any, context: EJS.Data, tplSettings?: EJS.Options)
    {
        editor.copy(from, to, {
            process: (contents: Object, filename?: string): memFsEditor.Contents =>
            {
                if (IsBinaryFile.sync(filename))
                {
                    return Buffer.from(contents as string, "binary");
                }
                else
                {
                    return EJS.render(contents.toString(), context, tplSettings || { });
                }
            }
        })
    }
}