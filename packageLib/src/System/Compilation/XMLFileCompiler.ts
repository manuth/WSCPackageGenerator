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
     * Gets the tag-name of the doucment-element of the `xml`-document
     */
    protected abstract get TagName(): string;

    protected async Compile(): Promise<void>
    {
        await FileSystem.writeFile(
            this.DestinationPath,
            XML.Prettify(new XMLSerializer().serializeToString(this.XMLElement)));
    }

    /**
     * Gets the compiled `xml`-document of the component.
     */
    protected get XMLElement(): Document
    {
        return XML.CreateDocument(this.TagName);
    }
}