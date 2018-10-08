import { IDeleteInstruction } from "../PackageSystem/Instructions/IDeleteInstruction";
import { XMLEditor } from "../Serialization/XMLEditor";
import { ImportFileCompiler } from "./ImportFileCompiler";

/**
 * Provides the functionality to compile files with an import- and a delete-section.
 */
export abstract class ObjectDeletionFileCompiler<T extends IDeleteInstruction<TObject>, TObject> extends ImportFileCompiler<T>
{
    /**
     * Initializes a new instance of the `DeleteInstructionFileCompiler<T, TObject>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Serializes the delete-section of the document.
     */
    protected CreateDelete(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateDelete());

        for (let objectToDelete of this.Item.ObjectsToDelete)
        {
            editor.Add(this.CreateDeleteObject(objectToDelete));
        }

        return editor.Element;
    }

    /**
     * Serializes an object to delete.
     */
    protected abstract CreateDeleteObject(object: TObject): Element;
}