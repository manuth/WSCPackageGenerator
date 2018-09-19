import * as Path from "path";
import * as Temp from "tmp";

export class TempDirectory
{
    /**
     * The temporary directory.
     */
    private tempDirectory: Temp.SynchrounousResult;

    /**
     * Initializes a new instance of the `TempDirectory` class.
     */
    public constructor()
    {
        this.tempDirectory = Temp.dirSync();
    }

    /**
     * The name of the temporary directory.
     */
    public get FileName(): string
    {
        return this.tempDirectory.name;
    }

    /**
     * Joins the paths and returns the path contained by the temporary directory.
     *
     * @param path
     * The path that is to be joined.
     */
    public MakePath(...path: string[]): string
    {
        return Path.join(this.FileName, ...path);
    }

    /**
     * Disposes the temporary directory and removes all references.
     */
    public Dispose(): void
    {
        this.tempDirectory.removeCallback();
        this.tempDirectory = null;
    }
}