import * as FileSystem from "fs-extra";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import * as tar from "tar";

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
    private destinationPath = "";

    /**
     * Initializes a new instance of the `Compiler<T>` class.
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
    public get DestinationPath()
    {
        return this.destinationPath;
    }

    public set DestinationPath(value)
    {
        this.destinationPath = value;
    }

    /**
     * Compiles the item.
     */
    public async Execute()
    {
        await this.Compile();
    }

    /**
     * Compiles the item.
     */
    protected abstract async Compile(): Promise<void>;

    /**
     * Copies files using `EJS`.
     *
     * @param source
     * The source to copy the files from.
     *
     * @param destination
     * The destination to copy the files to.
     *
     * @param context
     * The context to use.
     */
    protected async CopyTemplate(source: string, destination: string, context?: { [key: string]: any })
    {
        let fileSystem = memFsEditor.create(memFs.create());
        fileSystem.copyTpl(source, destination, context, {}, { globOptions: { dot: true } });

        await new Promise<void>(
            (resolve) =>
            {
                fileSystem.commit(
                    [],
                    () =>
                    {
                        resolve();
                    });
            });
    }

    /**
     * Joins the paths and returns the path contained by the destination-folder.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeDestinationPath(...path: string[])
    {
        return Path.join(this.DestinationPath, ...path);
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
    protected async Compress(source: string, destination: string)
    {
        await FileSystem.ensureDir(Path.dirname(destination));
        await tar.create(
            {
                cwd: Path.resolve(source),
                file: Path.resolve(destination)
            },
            await FileSystem.readdir(source));
    }
}