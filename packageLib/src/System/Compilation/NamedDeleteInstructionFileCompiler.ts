import { INamedObject } from "../INamedObject";
import { INamedDeleteInstruction } from "../PackageSystem/Instructions/INamedDeleteInstruction";
import { XML } from "../Serialization/XML";
import { XMLEditor } from "../Serialization/XMLEditor";
import { DeleteInstructionFileCompiler } from "./DeleteInstructionFileCompiler";

/**
 * Provides the functionality to compile files with a named delete-section.
 */
export abstract class NamedDeleteInstructionCompiler<T extends INamedDeleteInstruction> extends DeleteInstructionFileCompiler<T, INamedObject>
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