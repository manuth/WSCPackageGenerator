import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as Temp from "tmp";
import { TempFile } from "./TempFile";

/**
 * Represents a temporary directory.
 */
export class TempDirectory extends TempFile
{
    /**
     * Initializes a new instance of the `TempDirectory` class.
     */
    public constructor(options?: Temp.Options)
    {
        super(options);
    }

    protected Initialize(options: Temp.Options): void
    {
        this.TempFileEntry = Temp.dirSync(options);
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
        FileSystem.emptyDirSync(this.FileName);
        super.Dispose();
    }
}