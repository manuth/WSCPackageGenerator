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
     * Initializes a new instance of the `TempFile` class.
     */
    public constructor(options?: Temp.Options)
    {
        this.Initialize(options);
    }

    /**
     * Gets or sets the temporary file-entry.
     */
    protected get TempFileEntry()
    {
        return this.tempFileEntry;
    }

    protected set TempFileEntry(value)
    {
        this.tempFileEntry = value;
    }

    /**
     * The name of the temporary directory.
     */
    public get FileName()
    {
        return this.tempFileEntry.name;
    }

    /**
     * Disposes the temporary directory and removes all references.
     */
    public Dispose()
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
    public toString()
    {
        return this.FileName;
    }

    /**
     * Initializes the component.
     */
    protected Initialize(options: Temp.Options)
    {
        this.TempFileEntry = Temp.fileSync(options);
    }
}