import { isNullOrUndefined } from "util";
import { Listener } from "../../Events/Listener";
import { IListenerInstruction } from "../../PackageSystem/Instructions/Events/IListenerInstruction";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile listener-files.
 */
export abstract class ListenerFileCompiler<T extends IListenerInstruction<TListener>, TListener extends Listener> extends NamedObjectDeletionFileCompiler<T>
{
    /**
     * Initializes a new instance of the `ListenerFileCompiler<T, TListener>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    protected CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        for (let listener of this.Item.Listeners)
        {
            editor.Add(this.CreateListener(listener));
        }

        return editor.Element;
    }

    /**
     * Serializes a listener to xml.
     *
     * @param listener
     * The listener to serialize.
     */
    protected CreateListener(listener: TListener): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument(this.ObjectTagName).documentElement);
        editor.SetAttribute("name", listener.Name);
        editor.AddTextElement("environment", listener.Environment);
        editor.AddTextElement("eventname", listener.EventName);

        if (!isNullOrUndefined(listener.ExecutionOrder))
        {
            editor.AddTextElement("nice", listener.ExecutionOrder.toString());
        }

        if (listener.Permissions.length > 0)
        {
            editor.AddTextElement("permissions", listener.Permissions.join(","));
        }

        if (listener.Options.length > 0)
        {
            editor.AddTextElement("options", listener.Options.join(","));
        }

        return editor.Element;
    }
}