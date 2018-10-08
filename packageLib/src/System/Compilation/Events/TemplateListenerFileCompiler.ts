import { TemplateListener } from "../../Customization/Presentation/TemplateListener";
import { TemplateListenerInstruction } from "../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { ListenerFileCompiler } from "./ListenerFileCompiler";

/**
 * Provides the functionality to compile template-listener files.
 */
export class TemplateListenerFileCompiler extends ListenerFileCompiler<TemplateListenerInstruction, TemplateListener>
{
    /**
     * Initializes a new instance of the `EventListenerFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: TemplateListenerInstruction)
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/templateListener.xsd";
    }

    protected get ObjectTagName(): string
    {
        return "templatelistener";
    }

    protected CreateListener(listener: TemplateListener): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateListener(listener));
        editor.Insert(2, editor.CreateTextElement("templatename", listener.TemplateName));
        editor.Insert(editor.ChildNodes.length, editor.CreateCDATAElement("code", listener.Code));
        return editor.Element;
    }
}