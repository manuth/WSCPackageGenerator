import { isNullOrUndefined } from "util";
import { UserCategory } from "../../Options/UserPanel/UserCategory";
import { UserOption } from "../../Options/UserPanel/UserOption";
import { UserOptionInstruction } from "../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { OptionFileCompiler } from "./OptionFileCompiler";

/**
 * Provides the functionality to compiler user-option files.
 */
export class UserOptionFileCompiler extends OptionFileCompiler<UserOptionInstruction, UserCategory, UserOption>
{
    /**
     * Initializes a new instance of the `UserOptionFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: UserOptionInstruction)
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/userOption.xsd";
    }

    protected CreateOption(option: UserOption): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateOption(option));
        editor.AddTextElement("required", option.Required ? "1" : "0");
        editor.AddTextElement("askduringregistration", option.AskOnRegistration ? "1" : "0");
        editor.AddTextElement("editable", option.EditPermissions.toString());
        editor.AddTextElement("visible", option.ViewPermissions.toString());
        editor.AddTextElement("searchable", option.Searchable ? "1" : "0");

        if (!isNullOrUndefined(option.OutputClass))
        {
            editor.AddTextElement("outputclass", option.OutputClass);
        }

        return editor.Element;
    }
}