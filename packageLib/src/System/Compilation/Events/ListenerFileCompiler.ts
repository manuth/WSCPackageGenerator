import { isNullOrUndefined } from "util";
import { Listener } from "../../Events/Listener";
import { IListenerInstruction } from "../../PackageSystem/Instructions/Events/IListenerInstruction";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile listener-files.
 */
export abstract class ListenerFileCompiler<T extends IListenerInstruction<TListener>, TListener extends Listener> extends WoltLabXMLCompiler<T>
{
    /**
     * Initializes a new instance of the `ListenerFileCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the tag-name for the listeners.
     */
    protected abstract get ListenerTagName(): string;

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.AddElement(
            "import",
            ($import: XMLEditor) =>
            {
                for (let listener of this.Item.Listeners)
                {
                    $import.Add(this.CreateListener(listener));
                }
            });

        return document;
    }

    /**
     * Serializes a listener to xml.
     *
     * @param listener
     * The listener to serialize.
     */
    protected CreateListener(listener: TListener): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument(this.ListenerTagName).documentElement);
        editor.SetAttribute("name", listener.Name);
        editor.SetAttribute("environment", listener.Environment);
        editor.SetAttribute("eventname", listener.EventName);

        if (!isNullOrUndefined(listener.ExecutionOrder))
        {
            editor.SetAttribute("nice", listener.ExecutionOrder.toString());
        }

        if (listener.Permissions.length > 0)
        {
            editor.SetAttribute("permissions", listener.Permissions.join(","));
        }

        if (listener.Options.length > 0)
        {
            editor.SetAttribute("options", listener.Options.join(","));
        }

        return editor.Element;
    }
}