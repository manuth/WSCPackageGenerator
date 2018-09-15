import * as ChildProcess from "child_process";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import { TempDirectory } from "../FileSystem/TempDirectory";

/**
 * Provides the functionality to compile a component.
 */
export abstract class Compiler<T>
{
    /**
     * The item to compile.
     */
    private item: T;

    /**
     * The path to save the compiled item to.
     */
    private destinationPath: string = "";

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
     * Gets or sets the path to save the compiled item to.
     */
    public get DestinationPath(): string
    {
        return this.destinationPath;
    }

    public set DestinationPath(value: string)
    {
        this.destinationPath = value;
    }

    /**
     * Gets the path to save temporary files to.
     */
    public get TempPath(): TempDirectory
    {
        return new TempDirectory();
    }

    /**
     * Gets the filesystem-editor for generating the output of the compiler.
     */
    public get FileSystem(): memFsEditor.memFsEditor.Editor
    {
        return this.fileSystem;
    }

    /**
     * Compiles the item.
     */
    public async Execute(): Promise<void>
    {
        await this.Compile();
    }

    /**
     * Compiles the item.
     */
    protected abstract async Compile(): Promise<void>;

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
     * Compresses a folder and saves the result to a specified file.
     *
     * @param source
     * The folder that is to be compressed.
     *
     * @param destination
     * The filename to save the compressed file to.
     */
    protected Compress(source: string, destination: string): void
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