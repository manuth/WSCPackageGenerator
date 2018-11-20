import { ACPCategory } from "../../Options/ControlPanel/ACPCategory";
import { ACPOption } from "../../Options/ControlPanel/ACPOption";
import { ACPOptionInstruction } from "../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { OptionFileCompiler } from "./OptionFileCompiler";

/**
 * Provides the functionality to compile acp-option files.
 */
export class ACPOptionFileCompiler extends OptionFileCompiler<ACPOptionInstruction, ACPCategory, ACPOption>
{
    /**
     * Initializes a new instance of the `ACPOptionFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ACPOptionInstruction)
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/option.xsd";
    }

    protected CreateOption(option: ACPOption): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateOption(option));
        editor.AddTextElement("hidden", option.Visible ? "0" : "1");
        editor.AddTextElement("supporti18n", option.Localizable ? "1" : "0");
        editor.AddTextElement("requirei18n", option.ForceLocalization ? "1" : "0");
        return editor.Element;
    }
}