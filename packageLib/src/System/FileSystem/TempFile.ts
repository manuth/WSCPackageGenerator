import * as Temp from "tmp";

/**
 * Represents a temporary file.
 */
export class TempFile
{
    /**
     * The temporary file-entry.
     */
    private tempFileEntry: Temp.SynchrounousResult;

    /**
     * Initializes a new instance of the `TempDirectory` class.
     */
    public constructor()
    {
        this.Initialize();
    }

    /**
     * Gets or sets the temporary file-entry.
     */
    protected get TempFileEntry(): Temp.SynchrounousResult
    {
        return this.tempFileEntry;
    }

    protected set TempFileEntry(value: Temp.SynchrounousResult)
    {
        this.tempFileEntry = value;
    }

    /**
     * The name of the temporary directory.
     */
    public get FileName(): string
    {
        return this.tempFileEntry.name;
    }

    /**
     * Initializes the component.
     */
    protected Initialize(): void
    {
        this.TempFileEntry = Temp.fileSync();
    }

    /**
     * Disposes the temporary directory and removes all references.
     */
    public Dispose(): void
    {
        this.tempFileEntry.removeCallback();
        this.tempFileEntry = null;
    }

    /**
     * Returns a string which represents the object.
     *
     * @returns
     * A string which represents the object.
     */
    public toString(): string
    {
        return this.FileName;
    }
}