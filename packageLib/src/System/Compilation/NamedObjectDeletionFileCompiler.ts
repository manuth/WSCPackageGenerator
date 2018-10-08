import { INamedObject } from "../INamedObject";
import { INamedDeleteInstruction } from "../PackageSystem/Instructions/INamedDeleteInstruction";
import { XML } from "../Serialization/XML";
import { XMLEditor } from "../Serialization/XMLEditor";
import { ObjectDeletionFileCompiler } from "./ObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile files with a named delete-section.
 */
export abstract class NamedObjectDeletionFileCompiler<T extends INamedDeleteInstruction> extends ObjectDeletionFileCompiler<T, INamedObject>
{
    /**
     * Gets the tag-name for the objects.
     */
    protected abstract get ObjectTagName(): string;

    protected CreateDeleteObject(object: INamedObject): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument(this.ObjectTagName).documentElement);
        editor.SetAttribute("name", object.Name);
        return editor.Element;
    }
}