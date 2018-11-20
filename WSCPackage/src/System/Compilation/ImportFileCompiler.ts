import { XML } from "../Serialization/XML";
import { XMLEditor } from "../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "./WoltLabXMLCompiler";

/**
 * Provides the functionality to compile files with an import- and a delete-section.
 */
export abstract class ImportFileCompiler<T> extends WoltLabXMLCompiler<T>
{
    /**
     * Initializes a new instance of the `ImportFileCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.Add(this.CreateImport());
        editor.Add(this.CreateDelete());
        return document;
    }

    /**
     * Serializes the import-section of the document.
     */
    protected CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument("import").documentElement);
        return editor.Element;
    }

    /**
     * Serializes the delete-section of the document.
     */
    protected CreateDelete(): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument("delete").documentElement);
        return editor.Element;
    }
}