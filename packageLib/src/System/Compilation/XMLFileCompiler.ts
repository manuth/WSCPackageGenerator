import * as FileSystem from "fs-extra";
import { XMLSerializer } from "xmldom";
import { XML } from "../Serialization/XML";
import { Compiler } from "./Compiler";

/**
 * Provides the functionality to compile components to `.xml`-files.
 */
export abstract class XMLFileCompiler<T> extends Compiler<T>
{
    /**
     * Initializes a new instance of the `XMLFileCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the tag-name of the document-element of the `xml`-document
     */
    protected abstract get TagName(): string;

    protected async Compile(): Promise<void>
    {
        await FileSystem.ensureFile(this.DestinationPath);
        await FileSystem.writeFile(this.DestinationPath, this.Content);
    }

    /**
     * Gets the compiled `xml`-document of the component.
     */
    protected get Document(): Document
    {
        return this.CreateDocument();
    }

    /**
     * Gets the content of the `xml`-element as a string.
     */
    protected get Content(): string
    {
        return XML.Format(new XMLSerializer().serializeToString(this.Document));
    }

    /**
     * Creates the document to compile.
     */
    protected CreateDocument(): Document
    {
        return XML.CreateDocument(this.TagName);
    }
}