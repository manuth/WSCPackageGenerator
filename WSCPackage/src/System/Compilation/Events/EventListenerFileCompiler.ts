import { EventListener } from "../../Events/EventListener";
import { EventListenerInstruction } from "../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { ListenerFileCompiler } from "./ListenerFileCompiler";

/**
 * Provides the functionality to compile event-listener files.
 */
export class EventListenerFileCompiler extends ListenerFileCompiler<EventListenerInstruction, EventListener>
{
    /**
     * Initializes a new instance of the `EventListenerFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EventListenerInstruction)
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/eventListener.xsd";
    }

    protected get ObjectTagName(): string
    {
        return "eventlistener";
    }

    protected CreateListener(listener: EventListener): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateListener(listener));
        editor.Insert(2, editor.CreateTextElement("eventclassname", listener.ClassName));
        editor.Insert(3, editor.CreateTextElement("inherit", listener.AllowInherited ? "1" : "0"));
        editor.Insert(editor.ChildNodes.length, editor.CreateTextElement("listenerclassname", listener.EventHandlerClassName));
        return editor.Element;
    }
}